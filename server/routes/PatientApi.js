const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientSchema');

// POST endpoint to insert a new patient
router.post('/insert-patient', async (req, res) => {
  const { patientName, cnic, phone, address, date, time } = req.body;
  try {
    const newPatient = new Patient({
      patientName, 
      cnic, 
      phone, 
      address, 
      date, 
      time
    });
    await newPatient.save();
    res.status(201).json({ message: 'Patient data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting patient data' });
  }
});

// GET endpoint to fetch all patient records
router.get('/show-patient', async (req, res) => {
  console.log("API hit");
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching patient data' });
  }
});

// DELETE endpoint to remove a patient record by ID
router.delete('/delete-patient/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'Patient record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting patient record' });
  }
});

module.exports = router;
