const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb', {
      serverSelectionTimeoutMS: 2000
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📚 Database: ${conn.connection.name}`);
    console.log(`🔌 Port: ${conn.connection.port}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Note: ${error.message}`);
    console.warn('Backend is running in in-memory mode (Practical 4). Start MongoDB service when ready for Practical 5 persistence.');
  }
};

module.exports = connectDB;