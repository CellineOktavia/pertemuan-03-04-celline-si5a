// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: kost (id, nama, harga, lokasi, status)
//
// TODO kost: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let kost = [
  { id: 1, nama: "Kost Harmoni", lokasi: "Bukit Besar, Palembang", harga: "1200000", status: "tersedia"},
  { id: 2, nama: "Kost Drian", lokasi: "Taksam, Palembang", harga: "2000000", status: "tersedia"},
  { id: 3, nama: "Kost Sejahtera", lokasi: "Bangau, Palembang", harga: "1500000", status: "tidak tersedia"},
  { id: 4, nama: "Kost Pluto", lokasi: "Kenten Laut, Palembang", harga: "1000000", status: "tidak tersedia"},
  { id: 5, nama: "Kost Juniorror", lokasi: "Plaju Kulon, Palembang", harga: "800000", status: "tersedia"}
];

// TODO 1: GET /kost -> kirim seluruh data sebagai JSON
app.get("/kost", (req, res) => {
  res.json(kost);
});

//Latihan 1
// Buat fungsi untuk mengambil data kost tersedia, dengan alamat: kost/tersedia
app.get("/kost/tersedia", (req, res) => {
  const kostTersedia = kost.filter((m) => m.status.toLowerCase() === "tersedia");
  res.json(kostTersedia);
});

// TODO 2: GET /kost/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/kost/:id", (req, res) => {
  const { id } = req.params;
  const kostId = parseInt(id);
  const data = kost.find((m) => m.id === kostId);

  if (!data) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  res.json(data);
});

// TODO 3: POST /kost -> ambil { nama, jurusan } dari req.body,
// buat objek baru dengan id = kost.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/kost", (req, res) => {
  const { nama, lokasi, harga, status } = req.body;
  const newKost = {
    id: kost.length + 1,
    nama,
    lokasi,
    harga,
    status
  };
  kost.push(newKost);
  res.status(201).json(newKost);
});

// TODO 4: PUT /kost/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/kost/:id", (req, res) => {
  const { id } = req.params;
  const kostId = parseInt(id);
  const index = kost.findIndex((m) => m.id === kostId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  const { nama, lokasi, harga, status } = req.body;
  kost[index] = { ...kost[index], nama, lokasi, harga, status };
  res.json(kost[index]);
});

// TODO 5: DELETE /kost/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/kost/:id", (req, res) => {
  const { id } = req.params;
  const kostId = parseInt(id);
  const index = kost.findIndex((m) => m.id === kostId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  kost.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
