const nodemailer = require('nodemailer');

// Configure the transporter with Gmail or your SMTP provider
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' or your email service provider
    auth: {
        user: 'mzkxpmks@gmail.com', // Replace with your email
        pass: 'kdbt hozh agqm lrug',       // Replace with your email password or App Password
    },
});

// Define the email options
const mailOptions = {
    from: 'mzkxpmks@gmail.com', // Sender's email address
    to: 'RECIPIENT_EMAIL@gmail.com', // Recipient's email address
    subject: 'Test Email from Nodemailer',
    text: 'This is a test email to check Nodemailer functionality.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
``
