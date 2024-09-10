const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
    
  },
  fee: {
    type: String,
    required: true,
  
  },
  address: {
    type: String,
    required: true,
   
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  qualification: {
    type: [String], 
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  picture: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true 
});
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
