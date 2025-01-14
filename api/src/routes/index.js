const express = require("express");
const router = express.Router();
const walletRouter = require("./walletRouter");


router.use("/wallet", walletRouter);

module.exports = router;