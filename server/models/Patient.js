const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  diagnosis: { type: String, required: true },
  prescriptionNotes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
