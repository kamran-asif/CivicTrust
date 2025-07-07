import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // name for police and citizen
  name: { type: String},

  // phone for citizen
  phone: { type: String, required: function() { return this.role === 'citizen'; } },

  // badge number only for police
  badgeNumber: { type: String, required: function() { return this.role === 'police'; }},

  password: { type: String },  
  role: { 
    type: String, 
    enum: ['police', 'citizen', 'anonymous'], 
    required: true 
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
