const express = require("express");
const {
  addFunds,
  payForSomething,
  getUserWallet
} = require("../controllers/wallet");

const router = express.Router();

// Rutas para transacciones
router.post("/add-founds/:uid", addFunds);
router.post("/pay-for-something/:uid", payForSomething);
router.get("/get-user-wallet/:uid", getUserWallet);

module.exports = router;
