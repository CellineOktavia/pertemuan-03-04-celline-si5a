// Mini Project: Controller Kost (MongoDB & Mongoose)
// Handler untuk seluruh endpoint CRUD & kustom entitas Kost

const Kost = require("../models/kostModel"); // Sesuaikan path model sesuai struktur folder proyekmu

// 1. GET /kost -> Ambil seluruh data kost
exports.getAll = async (req, res) => {
  try {
    const data = await Kost.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. GET /kost/tersedia -> Ambil khusus data kost yang berstatus 'tersedia'
exports.getTersedia = async (req, res) => {
  try {
    // Mencari data kost dengan status 'tersedia' (case-insensitive)
    const data = await Kost.find({ 
      status: { $regex: /^tersedia$/i } 
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. GET /kost/:id -> Cari data berdasarkan ID MongoDB (_id)
exports.getById = async (req, res) => {
  try {
    const data = await Kost.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4. POST /kost -> Tambah data kost baru (mengambil nama, lokasi, harga, status dari req.body)
exports.create = async (req, res) => {
  try {
    const newKost = await Kost.create(req.body);
    res.status(201).json(newKost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 5. PUT /kost/:id -> Perbarui data kost berdasarkan ID
exports.update = async (req, res) => {
  try {
    const data = await Kost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 6. DELETE /kost/:id -> Hapus data kost berdasarkan ID
exports.remove = async (req, res) => {
  try {
    const data = await Kost.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};