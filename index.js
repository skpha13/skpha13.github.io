require('dotenv').config();

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const app = express();

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

app.post('/contact', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_SEND_USER,
        subject: name,
        text: `Email: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email failed');
            res.status(500).json({ status: 'error', message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ status: 'success', message: 'Email sent successfully' });
        }
    });
});

const port = 3000;
app.listen(port);
console.log(`Server is running on port ${port}`);