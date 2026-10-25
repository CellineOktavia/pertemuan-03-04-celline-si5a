// controllers/kostController.js

const Kost = require("../models/kostModel");

const MAX_LIMIT = 100;

// 1. GET /kost (Filtering, Search, Pagination, Sorting, & Projection)
exports.getAll = async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = { $regex: new RegExp(`^${req.query.status}$`, "i") };
  }

  if (req.query.search) {
    filter.$or = [
      { nama: { $regex: req.query.search, $options: "i" } },
      { lokasi: { $regex: req.query.search, $options: "i" } },
    ];
  }

  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const parsedLimit = parseInt(req.query.limit, 10) || 10;
  const limit = Math.min(MAX_LIMIT, Math.max(1, parsedLimit));

  let sortOptions = { createdAt: -1 };
  if (req.query.sort) {
    const isDescending = req.query.sort.startsWith("-");
    const field = isDescending ? req.query.sort.substring(1) : req.query.sort;
    sortOptions = { [field]: isDescending ? -1 : 1 };
  }

  const projection = req.query.fields
    ? req.query.fields.split(",").join(" ")
    : null;

  const [data, total] = await Promise.all([
    Kost.find(filter)
      .select(projection)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit),
    Kost.countDocuments(filter),
  ]);

  res.json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
};

// 2. GET /kost/tersedia
exports.getTersedia = async (req, res) => {
  const data = await Kost.find({ status: { $regex: /^tersedia$/i } });
  res.json(data);
};

// 3. GET /kost/:id
exports.getById = async (req, res) => {
  const data = await Kost.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.json(data); // Kembalikan data objek langsung
};

// 4. POST /kost (PENTING: Langsung kirim objek 'kost')
exports.create = async (req, res) => {
  if (Array.isArray(req.body)) {
    const kosts = await Kost.insertMany(req.body);
    return res.status(201).json(kosts);
  }

  const kost = await Kost.create(req.body);
  res.status(201).json(kost); // Mengembalikan objek tunggal secara langsung
};

// 5. PUT /kost/:id
exports.update = async (req, res) => {
  const data = await Kost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.json(data); // Kembalikan data objek langsung
};

// 6. DELETE /kost/:id
exports.remove = async (req, res) => {
  const data = await Kost.findByIdAndDelete(req.params.id);
  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.status(204).send();
};