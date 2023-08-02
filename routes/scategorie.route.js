const express = require("express");
const router = express.Router();
const scategorie = require("../models/scategorie");

// afficher la liste des categories.
router.get("/", async (req, res) => {
  try {
    const scat = await scategorie.find({}, null, { sort: { _id: -1 } })

    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// créer un nouvelle catégorie
router.post("/", async (req, res) => {
  const nouvscateg = new scategorie(req.body);

  try {
    await nouvscateg.save();

    res.status(200).json(newscategorie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// chercher une sous catégorie
router.get("/:scategorieId", async (req, res) => {
  try {
    const scat = await scategorie.findById(req.params.scategorieId);
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// modifier une catégorie
router.put("/:scategorieId", async (req, res) => {
  try {
    const scat= await scategorie.findByIdAndUpdate(
      req.params.scategorieId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer une catégori
router.delete("/:scategorieId", async (req, res) => {
  const id = req.params.scategorieId;
  await scategorie.findByIdAndDelete(id);
  res.json({ message: "sous categorie deleted successfully." });
});

// chercher une sous catégorie par cat
router.get("/cat/:categorieID", async (req, res) => {
  try {
    const scat = await scategorie.find({
      categorieID: req.params.categorieID,
    }).exec();
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
