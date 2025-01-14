const express = require("express");
const {
  addFunds,
  getTransactionsByUserId,
} = require("../controllers/wallet");

const router = express.Router();

// Rutas para transacciones
router.post("/add-founds/:uid", addFunds);
router.get("/get-transactions/:uid", getTransactionsByUserId);

module.exports = router;
