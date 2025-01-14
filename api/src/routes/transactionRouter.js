const express = require("express");
const { createTransaction, getTransactionsByUser } = require("../controllers/transactionController");


const router = express.Router();

// Rutas para transacciones
router.post("/", createTransaction);
router.get("/:userId", getTransactionsByUser);

module.exports = router;
