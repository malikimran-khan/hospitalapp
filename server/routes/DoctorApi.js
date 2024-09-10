const cors = require('cors');
const path = require('path');
const multer = require('multer');
const Doctor = require('../models/DoctorSchema'); 
const express = require('express')
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/images/doctor'));
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Please upload an image file'));
      }
      cb(null, true);
    }
  });

  router.post('/insert-doctor', upload.single('picture'), async (req, res) => {
    try {
      const { doctorName, fee, address, cnic, phoneNumber, qualification, specialization } = req.body;
      const picture = req.file ? req.file.filename : null; // Check if file exists and set the filename
  
      if (!picture) {
        return res.status(400).json({ status: -1, message: 'Picture is required.' });
      }
  
      const newDoctor = new Doctor({
        doctorName,
        fee,
        address,
        cnic,
        phoneNumber,
        qualification: JSON.parse(qualification), // Parsing the JSON string back to array
        specialization,
        picture: `/public/images/doctor/${picture}` // Set the picture path correctly
      });
  
      await newDoctor.save();
      res.json({ success: true, message: "Doctor added successfully." });
    } catch (error) {
      res.status(400).json({ status: -1, message: error.message });
      console.error("Error inserting doctor:", error);
    }
  });
  
router.get('/fetch-doctors', async (req, res) => {
  
    try {
      const doctors = await Doctor.find(); // Fetch all doctors from the database
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
  });

  router.delete('/delete-doctor/:id' , async(req,res)=>{
    const doctorId = req.params.id
    try {
        const doctordata = await  Doctor.findByIdAndDelete(doctorId)
        if(!doctorId)
            {
              return  res.status(404).json({success:false , error:"Record Not Found"})
            }
            res.status(200).json({success:true , massage:"Record delete successfully"})
    } catch (error) {
        console.log("Error deleting doctor" , error)
        res.status(500).json({success:false , massage:"Internal server error"})
    } 
})
module.exports = router;