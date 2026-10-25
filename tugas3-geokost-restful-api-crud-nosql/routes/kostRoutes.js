const express = require("express");
const router = express.Router();
const kostController = require("../controllers/kostController");

router.get("/", kostController.getAll);
router.get("/tersedia", kostController.getTersedia); // Urutkan sebelum /:id
router.get("/:id", kostController.getById);
router.post("/", kostController.create);
router.put("/:id", kostController.update);
router.delete("/:id", kostController.remove);

module.exports = router;