import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { dirname, join } from "path";
import { fileURLToPath } from "url";

//  MongoDB (replace with your connection string)
mongoose.connect('gmail', 'igmer54167@gmail.com', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose form data
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});
const FormEntry = mongoose.model('FormEntry', formSchema);

// Set up Nodemailer transporter (replace with your email service configuration)
const transporter = nodemailer.createTransport({
  service: 'your-email-service', // e.g., 'gmail'
  auth: {
    user: 'your-email-address',
    pass: 'your-email-password'
  }
});

const app = express();
const port = 3333;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ... (your existing route handlers)

app.post('/submit-form', async (req, res) => {
  try {
    // Validate the form data (simple example, add more validation as needed)
    if (!req.body.name || !req.body.email) {
      throw new Error('Name and email are required');
    }

    // Save the form data to the database
    const newFormEntry = new FormEntry(req.body);
    await newFormEntry.save();

    // Send an email (adjust the mail options as needed)
    const mailOptions = {
      from: 'your-email-address',
      to: req.body.email, // Send to the submitter's email as an example
      subject: 'Form Submission Received',
      text: `Thank you for your submission, ${req.body.name}! We will get back to you shortly.`
    };
    await transporter.sendMail(mailOptions);

    // Send a success response to the client
    res.send('Form submitted successfully!');
  } catch (error) {
    // Handle errors and send an error response to the client
    console.error(error);
    res.status(500).send('An error occurred while submitting the form.');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});