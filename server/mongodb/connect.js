import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('connected to mongo');
  } catch (err) {
    console.error('failed to connect with mongo');
    console.error(err);
  }
};

export default connectDB;
