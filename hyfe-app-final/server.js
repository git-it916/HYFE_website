import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fileURLToPath } from 'url';
import { requireAuth, requireAdmin } from './authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const DATA_PATH = path.join(__dirname, 'data', 'teams.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const USE_S3 = Boolean(process.env.S3_BUCKET && process.env.AWS_REGION);
const S3_KEY_PREFIX = process.env.S3_KEY_PREFIX || 'uploads/';
const PUBLIC_UPLOAD_BASE =
  process.env.PUBLIC_UPLOAD_BASE ||
  (process.env.S3_BUCKET && process.env.AWS_REGION
    ? `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`
    : '');

// Ensure required folders exist
fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const upload = multer(USE_S3 ? { storage: multer.memoryStorage() } : { dest: UPLOAD_DIR });
const s3Client = USE_S3
  ? new S3Client({
      region: process.env.AWS_REGION,
      credentials: process.env.AWS_ACCESS_KEY_ID
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined, // allow IAM role/ECS task role
    })
  : null;

app.use(cors());
app.use(express.json());

// In-memory demo user. Replace with DB in production.
const ADMIN_USER = {
  email: process.env.ADMIN_EMAIL || 'admin@hanyang.ac.kr',
  password: process.env.ADMIN_PASSWORD || 'gkdlvp1!',
  role: 'admin',
};

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (email !== ADMIN_USER.email || password !== ADMIN_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '2h' });
  res.json({ token, role: 'admin' });
});

app.get('/api/teams', (_req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read data file', error: err.message });
  }
});

app.post('/api/teams', requireAuth, requireAdmin, (req, res) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to write data file', error: err.message });
  }
});

app.post('/api/upload', requireAuth, requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    if (USE_S3 && s3Client) {
      const key = `${S3_KEY_PREFIX}${Date.now()}-${req.file.originalname}`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        }),
      );
      const base = PUBLIC_UPLOAD_BASE?.replace(/\/$/, '') || '';
      const url = `${base}/${key}`;
      return res.json({ url });
    }

    const url = `/uploads/${req.file.filename}`;
    return res.json({ url });
  } catch (err) {
    console.error('Upload failed', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

app.use('/uploads', express.static(UPLOAD_DIR));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
