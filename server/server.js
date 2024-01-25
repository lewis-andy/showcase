const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Choose a port for your server

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route for handling form submissions
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a nodemailer transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lewisanyanje@gmail.com', // Replace with your email address
            pass: 'your-password' // Replace with your email password
        }
    });

    // Email content
    const mailOptions = {
        from: 'lewisanyanje@gmail.com', // Replace with your email address
        to: 'recipient-email@example.com', // Replace with the recipient's email address
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
