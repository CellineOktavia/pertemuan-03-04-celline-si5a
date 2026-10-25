// Mini Project - Pertemuan 11-12: Koneksi MongoDB, Routing & Error Handling Kost
// Jalankan dengan: npm install && npm start (setelah menyalin .env.example menjadi .env)

// Express Async Errors di baris PALING ATAS
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Import router dan errorHandler entitas Kost
const kostRoutes = require("./routes/kostRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

// Pasang route entitas Kost pada endpoint '/kost'
app.use("/kost", kostRoutes);

// Pasang errorHandler terpusat di PALING AKHIR setelah seluruh route
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  });