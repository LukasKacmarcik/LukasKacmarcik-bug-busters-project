const multer = require('multer');
const path = require('path');

const storageMeals = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./images/meals/'));
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Date.now() / 10000) + file.originalname.replace(/\s/g, '_'));
  },
});
const storageRestaurant = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./images/restaurant'));
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Date.now() / 10000) + file.originalname.replace(/\s/g, '_'));
  },
});

const uploadMeals = (req, res) => {
  const fieldName = 'image';
  return new Promise((resolve, reject) => {
    const handler = multer({ storage: storageMeals }).single(fieldName);
    handler(req, res, (err) => {
      if (err) {
        reject(err);
        return;
      }
      if (!req.file) {
        reject(new Error(`'${fieldName}' field is missing`));
        return;
      }
      resolve(true);
    });
  });
};

const uploadRestaurant = (req, res) => {
  const fieldName = 'image';
  return new Promise((resolve, reject) => {
    const handler = multer({ storage: storageRestaurant }).single(fieldName);
    handler(req, res, (err) => {
      if (err) {
        reject(err);
        return;
      }
      if (!req.file) {
        reject(new Error(`'${fieldName}' field is missing`));
        return;
      }
      resolve(true);
    });
  });
};

module.exports = { uploadMeals, uploadRestaurant };
