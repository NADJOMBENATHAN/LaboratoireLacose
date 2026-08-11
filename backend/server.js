const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Node.js fonctionne !");
});

let produits = [
    { id: 1, nom: "Produit A", description: "Description du produit A", prix: 10.0 },
    { id: 2, nom: "Produit B", description: "Description du produit B", prix: 20.0 }
];

app.get("/produits", (req, res) => {
    res.json(produits);
});

app.get("/produits/:id", (req, res) => {
    const produit = produits.find(p => p.id === parseInt(req.params.id));
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
});

app.post("/produits", (req, res) => {
    const { nom, description, prix } = req.body;
    if (!nom || prix === undefined) {
        return res.status(400).json({ message: "Les champs nom et prix sont requis" });
    }
    const newProduit = {
        id: produits.length ? Math.max(...produits.map(p => p.id)) + 1 : 1,
        nom,
        description: description || "",
        prix: parseFloat(prix)
    };
    produits.push(newProduit);
    res.status(201).json(newProduit);
});

app.put("/produits/:id", (req, res) => {
    const produit = produits.find(p => p.id === parseInt(req.params.id));
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    const { nom, description, prix } = req.body;
    if (nom !== undefined) produit.nom = nom;
    if (description !== undefined) produit.description = description;
    if (prix !== undefined) produit.prix = parseFloat(prix);
    res.json(produit);
});

app.delete("/produits/:id", (req, res) => {
    const index = produits.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Produit non trouvé" });
    const deleted = produits.splice(index, 1)[0];
    res.json({ message: "Produit supprimé", produit: deleted });
});

app.listen(5000, () => {
    console.log("Serveur lancé sur le port 5000");
});
