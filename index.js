require('dotenv').config();
const express = require('express');
const {google} = require('googleapis');

const app = express();
const port = 3000;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

app.get('/',(req,res)=>{
    const url = oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes
    });
    res.send(`<a href="${url}">Auth with Google</a>`)
})

app.get('/google-callback',async (req,res)=>{
    const {code} = req.query;
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    readEmails(oauth2Client,res);
});

async function readEmails(auth,res){
    const gmail = google.gmail({version:'v1',auth});
    const response = await gmail.users.messages.list({
        userId:'me',
        maxResults:30
    });

    const messages = response.data.messages;

    if(!messages){
        res.send('There are no messages');
        return;
    }
    
    const mails = await Promise.all(messages.map(async(message)=>`<li>${await getEmail(message.id,gmail)}</li>`))
    
    res.send(`<h2>Messages</h2><ul>${mails.join('')}</ul>`)
    return;
}

async function getEmail(emailId,gmail){
    const response = await gmail.users.messages.get({id:emailId,userId:'me'});
    const email = response.data;
    
    const subject = email.payload.headers.find(e=>e.name == 'Subject').value;
    const from = email.payload.headers.find(e=>e.name == 'From').value;

    return 'From:<b>'+from+'</b>\n'+subject;
}
app.listen(port,()=>{
    console.log('Server running');
})