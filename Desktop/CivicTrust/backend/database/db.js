import mongoose from 'mongoose';

const connectDB = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error('MongoDB Connection Error:', err.message);
      process.exit(1);
    });
};

export default connectDB;
