/* eslint-disable import/order */
import dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import cors from 'cors';
import dalleRoutes from './routes/dalleRoutes.js';
import express from 'express';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const mongoUrl = process.env.MONGODB_URL;

const startServer = async () => {
  try {
    connectDB(mongoUrl);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
