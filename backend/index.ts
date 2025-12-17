import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import authRoutes from './src/routes/authRoutes';
import noteRoutes from './src/routes/noteRoutes';


dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Notes-App';

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`
      );
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});
