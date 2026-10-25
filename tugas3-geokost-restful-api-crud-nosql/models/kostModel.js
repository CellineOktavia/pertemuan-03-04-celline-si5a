// Mini Project - Pertemuan 11-12: Model Kost (MongoDB & Mongoose)
// Model untuk entitas Kost lengkap dengan validasi Schema dan timestamps

const mongoose = require("mongoose");

const kostSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama kost wajib diisi"],
    trim: true
  },
  lokasi: {
    type: String,
    required: [true, "Lokasi kost wajib diisi"],
    trim: true
  },
  harga: {
    type: String,
    required: [true, "Harga kost wajib diisi"]
  },
  status: {
    type: String,
    required: [true, "Status kost wajib diisi"],
    enum: {
      values: ["tersedia", "tidak tersedia"],
      message: "Status harus 'tersedia' atau 'tidak tersedia'"
    },
    default: "tersedia"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Kost", kostSchema);