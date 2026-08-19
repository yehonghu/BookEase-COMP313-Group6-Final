const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const uploadsEnabled = process.env.UPLOADS_ENABLED === 'true';
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const fileFilter = (req, file, cb) => {
  const okTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!okTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'attachment'));
  }
  return cb(null, true);
};

let upload;
if (uploadsEnabled) {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, UPLOAD_DIR),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
    }),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 16, fieldSize: 10 * 1024 },
  });
} else {
  // Parse multipart fields safely while rejecting non-durable file uploads.
  upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 1, files: 0, fields: 16, fieldSize: 10 * 1024 },
  });
}

router.post(
  '/',
  (req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
      if (!err) return next();
      if (!uploadsEnabled && err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Attachments are unavailable in this public beta. Please send a text message instead.' });
      }
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large (max 5MB).' });
      }
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Invalid file upload.' });
      }
      return res.status(400).json({ success: false, message: err.message || 'Upload failed.' });
    });
  },
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    body('purpose').optional({ checkFalsy: true }).isLength({ max: 60 }),
    body('address').optional({ checkFalsy: true }).isLength({ max: 200 }),
    body('phone').optional({ checkFalsy: true }).isLength({ max: 30 }),
    body('rating').optional({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('lat').optional({ checkFalsy: true }).isFloat({ min: -90, max: 90 }),
    body('lng').optional({ checkFalsy: true }).isFloat({ min: -180, max: 180 }),
  ],
  createContactMessage
);

router.get('/', protect, authorize('admin'), getAllMessages);
router.patch('/:id/read', protect, authorize('admin'), markAsRead);
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
