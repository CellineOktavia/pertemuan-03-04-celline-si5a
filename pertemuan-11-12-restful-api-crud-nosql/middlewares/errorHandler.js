function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Terjadi kesalahan pada server";

  // 1. Tangkap CastError (Format ObjectId MongoDB Salah)
  if (err.name === "CastError") {
    status = 400;
    message = `Format ${err.path} tidak valid`;
  } 
  // 2. Tangkap ValidationError (Validasi Schema Mongoose)
  else if (err.name === "ValidationError") {
    status = 400;
    const messages = Object.values(err.errors).map((val) => val.message);
    message = messages.length > 0 ? messages[0] : "Validasi data gagal";
  } 
  // 3. Tangkap Duplicate Key (Nilai Unik Bentrok)
  else if (err.code === 11000) {
    status = 400;
    message = "Data unik sudah ada";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;