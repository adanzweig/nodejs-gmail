# Gmail Reader App

## Introduction
This application is designed to authenticate with Google OAuth2 and read the latest 30 emails from a user's Gmail account, displaying the sender and subject of each email. It utilizes Node.js, Express, and the Google APIs Node.js client.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v12.x or later recommended)
- npm (usually comes with Node.js)

You also need to set up a project in the Google Developer Console, enable the Gmail API, and obtain OAuth 2.0 credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URL`).

## Setup
1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install the dependencies.
3. Create a `.env` file in the root of your project directory with the following content, replacing the placeholders with your actual OAuth 2.0 credentials obtained from the Google Developer Console:

    ```plaintext
    CLIENT_ID=your_client_id_here
    CLIENT_SECRET=your_client_secret_here
    REDIRECT_URL=http://localhost:3000/google-callback
    ```

4. Ensure you have configured the consent screen and added the necessary scopes in the Google Developer Console.

## Running the Application
1. Start the server by running `node index.js` from the terminal. The console should display "Server running" indicating that the server is running on port 3000.
2. Open a web browser and navigate to `http://localhost:3000`. Click on the "Auth with Google" link to authenticate with Google OAuth2.
3. After authentication, you will be redirected to a page displaying the latest 30 emails from your Gmail account.

## Usage
This application is for educational purposes and demonstrates basic usage of the Gmail API, OAuth2 authentication, and asynchronous programming in Node.js.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Disclaimer
This application is not intended for production use and does not implement comprehensive error handling or security features. Always review and comply with the Gmail API usage policies and guidelines.
