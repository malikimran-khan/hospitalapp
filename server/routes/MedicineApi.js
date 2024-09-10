const express = require('express');
const router = express.Router();
const Medicine = require('../models/MedicineSchema');
router.post('/insert-medicine', async (req, res) => {
  const { name, type, dosage, manufacturer, expiryDate, price } = req.body;

  try {
    const newMedicine = new Medicine({
      name,
      type,
      dosage,
      manufacturer,
      expiryDate,
      price,
    });

    await newMedicine.save();
    res.status(201).json({ message: 'Medicine data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting medicine data' });
  }
});
router.get('/show-medicine' , async(req,res)=>{
    try {
        const medicine =await Medicine.find()
        res.status(200).json(medicine)

    } catch (error) {
        console.log("Error in fetching doctor data" , error)
        res.status(500).json({success:false , error : "Internal server error"})
    }
})

module.exports = router;
