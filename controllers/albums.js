const Music = require("../models/music");
const Filter = require("../models/filter");

exports.getAlbumsByLanguage = async (req, res, next) => {
  try {
    const { language } = req.params;
    await Music.find({ language: language }).then((data) => {
      if (data.length == 0) {
        const error = new Error("Invalid Search Parameter");
        error.statusCode = 404;
        next(error);
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
        const error = new Error("Invalid Search Parameter");
        error.statusCode = 404;
        next(error);
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

exports.getNewReleases = async (req, res, next) => {
  try {
    await Music.find({})
      .sort({ year: -1 })
      .limit(5)
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedAlbums = async (req, res, next) => {
  try {
    const count = await Music.countDocuments();
    // const randomIndexes = [];
    // while (randomIndexes.length < 5) {
    //   const randomIndex = Math.floor(Math.random() * count);
    //   if (!randomIndexes.includes(randomIndex)) {
    //     randomIndexes.push(randomIndex);
    //   }
    // }

    const randomIndex = Math.floor(Math.random() * (count - 5));
    await Music.find({})
      .skip(randomIndex)
      .limit(5)
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (error) {
    next(error);
  }
};
