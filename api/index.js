const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);
app.get("/", (_req, res) => {
  res.send("API de Gestión de Transacciones está activa");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
