import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Sample', sampleSchema);