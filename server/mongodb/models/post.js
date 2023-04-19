import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
