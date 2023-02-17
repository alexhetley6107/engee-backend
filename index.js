import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import listRoute from './routes/lists.js';
import wordRoute from './routes/words.js';

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 4000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoute);
app.use('/api/list', listRoute);
app.use('/api/word', wordRoute);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vbylrks.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => console.log(`Server is OKK on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
