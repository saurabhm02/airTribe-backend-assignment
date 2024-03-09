const express = require("express");
const dbConnect = require("./config/db");
const allRoutes = require("./routes/index");
require("dotenv").config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api/v1", allRoutes);

app.get("/", (req, res) => {
    res.send('<div style="background-color: orange; padding: 20px; display: flex; align-items: center; justify-content: center; height: 100%"> <h1 style="background-color: black; color: white;">airTribe Assignment: Design database and APIs for application based courses on Airtribe</h1> </div>');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});