const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storageEvents = multer.diskStorage({
  destination: './backend/storage/events/',
  filename: (req, file, cb) => { cb(null, file.originalname); }
});

const storageGalleries = multer.diskStorage({
  destination: './backend/storage/galleries/',
  filename: (req, file, cb) => { cb(null, file.originalname); }
});

const storageUsers = multer.diskStorage({
  destination: './backend/storage/users/',
  filename: (req, file, cb) => { cb(null, file.originalname); }
});

const storagePhotos = multer.diskStorage({
  destination: './backend/storage/photos/',
  filename: (req, file, cb) => { cb(null, file.originalname); }
});

const filter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
  const ext = fileTypes.test(path.extname(file.originalname));
  const mime = fileTypes.test(file.mimetype);

  if (!ext || !mime) return cb('SOLO IMAGENES jpeg, jpg o png', false);
  else return cb(null, true);
}

const filterEvents = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
  const ext = fileTypes.test(path.extname(file.originalname));
  const mime = fileTypes.test(file.mimetype);
  const exist = fs.existsSync('./backend/storage/events/'+file.originalname);

  if (!ext || !mime) return cb('SOLO IMAGENES jpeg, jpg o png', false);
  else if (exist) return cb('YA EXISTE UNA IMAGEN CON ESE NOMBRE', false);
  else return cb(null, true);
}

const filterGalleries = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
  const ext = fileTypes.test(path.extname(file.originalname));
  const mime = fileTypes.test(file.mimetype);
  const exist = fs.existsSync('./backend/storage/galleries/'+file.originalname);

  if (!ext || !mime) return cb('SOLO IMAGENES jpeg, jpg o png', false);
  else if (exist) return cb('YA EXISTE UNA IMAGEN CON ESE NOMBRE', false);
  else return cb(null, true);
}

const filterUsers = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
  const ext = fileTypes.test(path.extname(file.originalname));
  const mime = fileTypes.test(file.mimetype);
  const exist = fs.existsSync('./backend/storage/users/'+file.originalname);

  if (!ext || !mime) return cb('SOLO IMAGENES jpeg, jpg o png', false);
  else if (exist) return cb('YA EXISTE UNA IMAGEN CON ESE NOMBRE', false);
  else return cb(null, true);
}

// Storage cover events
exports.uploadEvent = multer({
  storage: storageEvents,
  limits: { fileSize: 524288000 }, // 500 MB
  fileFilter: filterEvents
}).single('cover');

// Storage cover galleries
exports.uploadGallery = multer({
  storage: storageGalleries,
  limits: { fileSize: 524288000 }, // 500 MB
  fileFilter: filterGalleries
}).single('cover');

// Storage image users
exports.uploadUser = multer({
  storage: storageUsers,
  limits: { fileSize: 524288000 }, // 500 MB
  fileFilter: filterUsers
}).single('image');

// Storage photos
exports.uploadPhotos = multer({
  storage: storagePhotos,
  limits: { fileSize: 524288000 }, // 500 MB
  fileFilter: filter
}).array('photos', 5000);