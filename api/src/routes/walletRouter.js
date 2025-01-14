const express = require("express");
const {
  addFunds,
  getTransactionsByUserId,
  payForSomething
} = require("../controllers/wallet");

const router = express.Router();

// Rutas para transacciones
router.post("/add-founds/:uid", addFunds);
router.get("/get-transactions/:uid", getTransactionsByUserId);
router.post("/pay-for-something/:uid", payForSomething);

module.exports = router;
