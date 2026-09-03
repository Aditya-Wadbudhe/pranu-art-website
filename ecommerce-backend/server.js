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

    subject: `New Enquiry from ${name} | Pranu Art Gallery`,

    html: `
      <div style="
        margin: 0;
        padding: 30px 15px;
        background: #f4f0e9;
        font-family: Arial, Helvetica, sans-serif;
        color: #29251f;
      ">

        <div style="
          max-width: 650px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2ddd5;
        ">

          <!-- Header -->
          <div style="
            padding: 28px 30px;
            background: #171512;
            text-align: center;
          ">
            <h1 style="
              margin: 0;
              color: #f4eee5;
              font-size: 24px;
              letter-spacing: 2px;
            ">
              PRANU ART GALLERY
            </h1>

            <p style="
              margin: 8px 0 0;
              color: #c9a66b;
              font-size: 12px;
              letter-spacing: 1.5px;
            ">
              NEW CUSTOMER ENQUIRY
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 35px;">

            <p style="
              margin: 0 0 25px;
              font-size: 16px;
              line-height: 1.6;
            ">
              A new customer has submitted an enquiry through
              the Pranu Art Gallery website.
            </p>

            <!-- Customer Details -->
            <h2 style="
              margin: 0 0 15px;
              font-size: 14px;
              color: #9a7847;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              Customer Details
            </h2>

            <table style="
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            ">

              <tr>
                <td style="
                  padding: 12px 0;
                  color: #777;
                  width: 100px;
                  border-bottom: 1px solid #eee;
                ">
                  Name
                </td>

                <td style="
                  padding: 12px 0;
                  font-weight: 600;
                  border-bottom: 1px solid #eee;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px 0;
                  color: #777;
                  border-bottom: 1px solid #eee;
                ">
                  Email
                </td>

                <td style="
                  padding: 12px 0;
                  border-bottom: 1px solid #eee;
                ">
                  ${email}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 12px 0;
                  color: #777;
                ">
                  Phone
                </td>

                <td style="
                  padding: 12px 0;
                ">
                  ${phone || "Not provided"}
                </td>
              </tr>

            </table>

            <!-- Message -->
            <h2 style="
              margin: 0 0 15px;
              font-size: 14px;
              color: #9a7847;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              Customer Message
            </h2>

            <div style="
              padding: 20px;
              background: #f7f3ed;
              border-left: 4px solid #c9a66b;
              line-height: 1.7;
              font-size: 15px;
              white-space: pre-line;
            ">
              ${message}
            </div>

            <!-- Reply Notice -->
            <div style="
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e0d8;
            ">
              <p style="
                margin: 0;
                color: #777;
                font-size: 13px;
                line-height: 1.6;
              ">
                <strong>Reply directly to this email</strong>
                to respond to ${name}.
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="
            padding: 20px 30px;
            background: #171512;
            text-align: center;
            color: #999;
            font-size: 12px;
            line-height: 1.6;
          ">
            Pranu Art Gallery
            <br>
            Website Enquiry Notification
          </div>

        </div>

      </div>
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