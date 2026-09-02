const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.send("Ecom backend is running!");
});


// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});