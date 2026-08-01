const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Node.js fonctionne !");
});

app.listen(5000, () => {
    console.log("Serveur lancé sur le port 5000");
});