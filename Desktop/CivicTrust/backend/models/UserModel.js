
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,

    phone: {
      type: String,
      required() {
        return this.role === 'citizen';
      }
    },

    badgeNumber: {
      type: String,
      required() {
        return this.role === 'police';
      }
    },

    password: String,

    role: {
      type: String,
      enum: ['police', 'citizen', 'anonymous'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema);
