//server.js


const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import Body Parser
const cors = require('cors'); // Import CORS for Cross-Origin Requests
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express(); // Initialize Express app

// Middleware to parse JSON and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mzkxpmks@gmail.com', // Replace with your email
        pass: 'kdbt hozh agqm lrug', // Replace with your email password or app-specific password
    },
});

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Configure the email
    const mailOptions = {
        from: 'mzkxpmks@gmail.com', // Sender's email
        to: 'mzkxpmks@gmail.com', // Target email address
        subject: 'Naujas laiškas iš Mzkx pmks',
        text: `
            Vardas: ${name}
            El. paštas: ${email}
            Telefono numeris: ${phone} 
            Žinutė: ${message}
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Form submitted and email sent successfully!' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


