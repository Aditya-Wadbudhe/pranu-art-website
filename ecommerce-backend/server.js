const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { parse } = require("csv-parse/sync");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// =========================================
// GOOGLE SHEET
// =========================================

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ypEQpgGrK4228wfpSEhuVJXmqmXYSHLz7xlFPcry0hM/gviz/tq?tqx=out:csv&gid=0";


// =========================================
// SMTP CONFIGURATION
// =========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


// =========================================
// HOME
// =========================================

app.get("/", (req, res) => {
  res.send("PranuArt backend is running!");
});


// =========================================
// GET PRODUCTS FROM GOOGLE SHEET
// =========================================

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_SHEET_URL);

    const products = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log("Products from Google Sheet:");
    console.log(products);

    const activeProducts = products.filter(
      (product) =>
        String(product.active || "")
          .trim()
          .toLowerCase() === "true"
    );

    res.json(activeProducts);

  } catch (error) {
    console.error("Google Sheet Error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});


// =========================================
// CONTACT FORM
// =========================================

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message,
    } = req.body;


    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }


    // Email details
    const mailOptions = {
      from: process.env.SMTP_EMAIL,

      to: process.env.ENQUIRY_EMAIL,
      replyTo: email,

      subject: `New Contact Message from ${name}`,

      text: `
New Contact Form Message
========================

Name:
${name}

Email:
${email}

Phone:
${phone || "Not provided"}

Message:
${message}

========================
This message was sent from the Pranu Art Gallery website.
      `,
    };


    // Send email
    await transporter.sendMail(mailOptions);


    // Send success response
    res.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("SMTP Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});


// =========================================
// START SERVER
// =========================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});