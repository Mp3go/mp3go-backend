const Music = require("../models/music");
const Filter = require("../models/filter");

exports.getAlbumsByLanguage = async (req, res, next) => {
  try {
    const { language } = req.params;
    await Music.find({ language: language }).then((data) => {
      if (data.length == 0) {
        return new Error("Invalid Search Parameter");
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    await Music.findById(albumId).then((data) => {
      if (!data) {
        return new Error("Invalid Search Parameter");
      } else {
        res.status(200).json(data);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getFilterData = async (req, res, next) => {
  try {
    await Filter.find({}).then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    next(err);
  }
};

exports.getAlbums = async (req, res, next) => {
  try {
    await Music.find({}).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    next(err);
  }
};
