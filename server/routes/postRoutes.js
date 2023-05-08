import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import PostModel from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Fetching posts failed, please try again',
      });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await PostModel.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    console.log(newPost);
    res.status(200).json({ success: true, data: newPost, cors: 'https://dall-e-clone-six.vercel.app, http://127.0.0.1:5173/' });
  } catch (err) {
    console.log(err); // Log the error
    res
      .status(500)
      .json({
        success: false,
        message: 'Unable to create a post, please try again',
      });
  }
});

export default router;
