import mongoose from 'mongoose';

const { Schema, model } = mongoose;
/**
 * @description Contact schema
 */
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('Contacts', ContactSchema);
