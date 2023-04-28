const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoute = require("./routes/ProductRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/products/", productRoute);

app.listen(6000, console.log(`server running in port Port 5000`.bgYellow));
