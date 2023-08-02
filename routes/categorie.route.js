const express = require("express");
const router = express.Router();
const Categorie = require("../models/categorie");
const { authorizeRoles } = require("./middleware/authorizeRoles");
const { verifyToken } = require("./middleware/verify-token");
const user = require("../models/user");

router.post("/",verifyToken,authorizeRoles("user"), async (req, res) => {
  const { nomcategorie, imagecategorie } = req.body;
  const newCategorie = new Categorie({
    nomcategorie: nomcategorie,
    imagecategorie: imagecategorie,
  });
  try {
    await newCategorie.save();
    res.status(200).json(newCategorie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// afficher la liste des categories.
router.get("/", async (req, res) => {
  try {
    const cat = await Categorie.find({}, null, { sort: { _id: -1 } });
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//GET SINGLE CATEGORIE
router.get("/:id", async (req, res) => {
  try {
    const cat = await Categorie.findById(req.params.id);
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//DELETE NEW WORKOUT
router.delete("/:id", async (req, res) => {
  const cat = await Categorie.findByIdAndDelete(req.params.id);
  res.json({ message: "categorie deleted successfully." });
});

// modifier une catégorie
router.put("/:categorieId", async (req, res) => {
  try {
    const cat1 = await Categorie.findByIdAndUpdate(
      req.params.categorieId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(cat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
