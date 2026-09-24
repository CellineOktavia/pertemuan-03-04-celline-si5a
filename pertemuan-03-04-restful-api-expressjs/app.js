// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: mahasiswa (id, nama, jurusan)
//
// TODO Mahasiswa: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi", status : "aktif"},
  { id: 2, nama: "Budi", jurusan: "Informatika", status : "Cuti"},
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer", status : "Cuti"},
  { id: 4, nama: "Dewi", jurusan: "Sistem Informasi", status : "Aktif"},
];

// TODO 1: GET /mahasiswa -> kirim seluruh data sebagai JSON
app.get("/mahasiswa", (req, res) => {
  res.json(mahasiswa);
});

//Latihan 1
// Buat fungsi untuk mengambil data mahasiswa aktif, dengan alamat: mahasiswa/aktif
app.get("/mahasiswa/aktif", (req, res) => {
  const mahasiswaAktif = mahasiswa.filter((m) => m.status.toLowerCase() === "aktif");
  res.json(mahasiswaAktif);
});

// TODO 2: GET /mahasiswa/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/mahasiswa/:id", (req, res) => {
  const { id } = req.params;
  const mahasiswaId = parseInt(id);
  const data = mahasiswa.find((m) => m.id === mahasiswaId);

  if (!data) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  res.json(data);
});

// TODO 3: POST /mahasiswa -> ambil { nama, jurusan } dari req.body,
// buat objek baru dengan id = mahasiswa.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;
  const newMahasiswa = {
    id: mahasiswa.length + 1,
    nama,
    jurusan
  };
  mahasiswa.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

// TODO 4: PUT /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/mahasiswa/:id", (req, res) => {
  const { id } = req.params;
  const mahasiswaId = parseInt(id);
  const index = mahasiswa.findIndex((m) => m.id === mahasiswaId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  const { nama, jurusan } = req.body;
  mahasiswa[index] = { ...mahasiswa[index], nama, jurusan };
  res.json(mahasiswa[index]);
});

// TODO 5: DELETE /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/mahasiswa/:id", (req, res) => {
  const { id } = req.params;
  const mahasiswaId = parseInt(id);
  const index = mahasiswa.findIndex((m) => m.id === mahasiswaId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  mahasiswa.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
