import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MessagingSchema = new Schema({
  sender: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Contacts',
    },
    phoneNumber: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  receiver: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Contacts',
    },
    phoneNumber: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model('Messaging', MessagingSchema);
