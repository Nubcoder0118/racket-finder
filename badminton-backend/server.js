import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import racketRoutes from './routes/racket.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/api/rackets', racketRoutes);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


// routes
app.get('/', (req, res) => {
    res.send('Badminton API is running...');
})

app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));

