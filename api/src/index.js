const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const transactionsRoutes = require("./routes/transactionRouter");

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use("/transactions", transactionsRoutes);

app.get("/", (_req, res) => {
  res.send("API de Gestión de Transacciones está activa");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
