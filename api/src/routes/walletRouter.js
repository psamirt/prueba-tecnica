const express = require("express");
const {
  addFunds,
  getFundsById,
  getTransactionsByUserId,
} = require("../controllers/wallet");

const router = express.Router();

// Rutas para transacciones
router.post("/", addFunds);
router.get("/:userId", getFundsById);
router.get("/get-transactions/:uid", getTransactionsByUserId);

module.exports = router;
