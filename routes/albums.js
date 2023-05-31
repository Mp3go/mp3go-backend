const express = require("express");
const albumController = require("../controllers/albums");

const router = express.Router();

// router.get("/new-releases", albumController.getNewReleases);

// router.get("/featured-albums", albumController.getFeaturedAlbums);

router.get("/all", albumController.getAlbums);

router.get("/language/:language", albumController.getAlbumsByLanguage);

router.get("/:albumId", albumController.getAlbum);

router.get("/data/filter", albumController.getFilterData);

module.exports = router;
