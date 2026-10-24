// Mini Project - Pertemuan 9-10: Model Kost (MongoDB & Mongoose)
// Schema untuk mendefinisikan struktur data entitas Kost

const mongoose = require("mongoose");

const kostSchema = new mongoose.Schema({
  // Field nama kost
  nama: {
    type: String,
    required: [true, "Nama kost wajib diisi"]
  },

  // Field lokasi kost
  lokasi: {
    type: String,
    required: [true, "Lokasi kost wajib diisi"]
  },

  // Field harga kost
  harga: {
    type: String,
    required: [true, "Harga kost wajib diisi"]
  },

  // Field status ketersediaan kost ('tersedia' / 'tidak tersedia')
  status: {
    type: String,
    required: [true, "Status kost wajib diisi"],
    enum: ["tersedia", "tidak tersedia"],
    default: "tersedia"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Kost", kostSchema);