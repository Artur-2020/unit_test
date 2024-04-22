import mongoose from 'mongoose';

export default class MongoDBLoader {
  static async connect() {
    try {
      const uri = 'mongodb://127.0.0.1:27017/unit_test';
      await mongoose.connect(uri);
      console.log('> MongoDB connected');
    } catch (e: any) {
      console.error('> MongoDB connection error:', e.message);
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
    console.log('> MongoDB disconnected');
  }
}

