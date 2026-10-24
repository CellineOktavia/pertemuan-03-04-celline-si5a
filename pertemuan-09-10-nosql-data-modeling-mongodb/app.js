// Mini Project - Pertemuan 9-10: Koneksi MongoDB & Routing Kost
// Jalankan dengan: npm install && npm start (setelah menyalin .env.example menjadi .env)

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Impor router entitas Kost
const kostRoutes = require("./routes/kostRoutes");

app.use(express.json());

// Pasang endpoint '/kost' untuk menangani seluruh rute Kost
app.use("/kost", kostRoutes);

// Koneksi ke MongoDB dan jalankan server Express
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB Server");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Gagal terhubung:", err.message));