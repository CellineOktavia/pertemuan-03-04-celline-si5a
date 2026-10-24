# Pertemuan 9-10 - NoSQL Data Modeling (MongoDB, Mongoose & MongoDB Atlas)

Mini-project pendamping untuk materi slide `Materi-Pertemuan-09-10-NoSQL-MongoDB-Mongoose-Atlas.pptx`.

## Tujuan

Menghubungkan aplikasi Express ke MongoDB Atlas melalui Mongoose, merancang Schema/Model, serta menerapkan pola **embedding** (alamat) dan **referencing** (prodi) pada entity `Mahasiswa`.

## Struktur

```
pertemuan-09-10-nosql-data-modeling-mongodb/
├── models/
├── controllers/
├── routes/
├── app.js
└── .env.example
```

## Model Data

- **Prodi** - `nama`, `jenjang`.
- **Mahasiswa** - `nama`, `nim` (unique), `alamat` (subdocument **embedded**: `jalan`, `kota`), `prodiId` (**referencing** ke `Prodi` via `ObjectId`), `createdAt`.

Alamat di-embed karena selalu diakses bersama data mahasiswa dan tidak dipakai entity lain. Prodi direferensi karena satu prodi dipakai berulang oleh banyak mahasiswa.

## Mengerjakan

Lengkapi setiap `// TODO` pada `models/mahasiswaModel.js`, `controllers/mahasiswaController.js`, `routes/mahasiswaRoutes.js`, dan `app.js`. Model & controller `Prodi` sudah lengkap sebagai contoh referencing.

**Prasyarat:** cluster MongoDB Atlas (paket gratis M0) beserta connection string-nya. Lihat slide Dasar - "MongoDB Atlas: MongoDB sebagai Layanan Cloud".

```bash
npm install
cp .env.example .env   # isi MONGODB_URI dengan connection string Atlas Anda
npm start
```

Endpoint yang tersedia setelah TODO dilengkapi:

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/mahasiswa` | Ambil seluruh mahasiswa (lengkap dengan data prodi via `populate`) |
| GET | `/mahasiswa/:id` | Ambil satu mahasiswa |
| POST | `/mahasiswa` | Tambah mahasiswa baru |
| PUT | `/mahasiswa/:id` | Perbarui data mahasiswa |
| DELETE | `/mahasiswa/:id` | Hapus mahasiswa |
| GET | `/prodi` | Ambil seluruh prodi |
| POST | `/prodi` | Tambah prodi baru |

Bandingkan hasilnya dengan solusi referensi di repositori terpisah [SI0027-PAWII-Solution](https://github.com/nurrachmat-nr/SI0027-PAWII-Solution) setelah selesai.

## Kaitan dengan Tugas Project Mandiri

Folder ini adalah latihan pendamping di kelas menggunakan entitas contoh (`mahasiswa`, `prodi`), **bukan** jawaban dari Tugas Project Mandiri pada slide materi (migrasi model data **project akhir Anda sendiri** ke MongoDB Atlas dengan Mongoose). Tugas tersebut dinilai secara terpisah.
