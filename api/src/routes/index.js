const express = require("express");
const router = express.Router();
const walletRouter = require("./walletRouter");
const { verifyToken } = require("../middleware/verifyToken");


router.use("/wallet", verifyToken, walletRouter);

module.exports = router;
