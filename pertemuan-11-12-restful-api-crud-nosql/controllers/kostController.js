// Mini Project - Pertemuan 11-12: Controller Kost
// Mendukung filtering, sorting, pagination, dan projection untuk entitas Kost.

const Kost = require("../models/kostModel");

const MAX_LIMIT = 100;

// 1. GET /kost -> Ambil semua data kost (mendukung filtering, sorting, pagination, search)
exports.getAll = async (req, res) => {
  try {
    const filter = {};

    // Filtering berdasarkan status (misal: ?status=tersedia)
    if (req.query.status) {
      filter.status = { $regex: new RegExp(`^${req.query.status}$`, "i") };
    }

    // Search query berdasarkan nama atau lokasi (misal: ?search=bukit)
    if (req.query.search) {
      filter.$or = [
        { nama: { $regex: req.query.search, $options: "i" } },
        { lokasi: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Pagination: page (default 1, min 1)
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);

    // Pagination: limit (default 10, max MAX_LIMIT)
    const parsedLimit = parseInt(req.query.limit, 10) || 10;
    const limit = Math.min(MAX_LIMIT, Math.max(1, parsedLimit));

    // Sorting: sortField & sortOrder (contoh: ?sort=harga atau ?sort=-harga untuk descending)
    let sortOptions = { createdAt: -1 };
    if (req.query.sort) {
      const isDescending = req.query.sort.startsWith("-");
      const field = isDescending ? req.query.sort.substring(1) : req.query.sort;
      sortOptions = { [field]: isDescending ? -1 : 1 };
    }

    // Projection: membatasi field yang dikembalikan (misal: ?fields=nama,harga)
    const projection = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : null;

    // Eksekusi query Kost & countDocuments secara paralel
    const [data, total] = await Promise.all([
      Kost.find(filter)
        .select(projection)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit),
      Kost.countDocuments(filter),
    ]);

    // Mengembalikan response terstruktur
    res.json({
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error : " + error.message });
  }
};

// 2. GET /kost/tersedia -> Ambil khusus data kost yang berstatus 'tersedia'
exports.getTersedia = async (req, res) => {
  try {
    const data = await Kost.find({ status: { $regex: /^tersedia$/i } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error : " + error.message });
  }
};

// 3. GET /kost/:id -> Ambil satu data berdasarkan ID
exports.getById = async (req, res) => {
  try {
    const data = await Kost.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. POST /kost -> Buat data kost baru
exports.create = async (req, res) => {
  try {
    const kost = await Kost.create(req.body);
    res.status(201).json(kost);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 6. DELETE /kost/:id -> Hapus data kost berdasarkan ID
exports.remove = async (req, res) => {
  try {
    const data = await Kost.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};