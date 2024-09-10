const mongoose = require('mongoose')
const patientschema = new mongoose.Schema({
    patientName:{
        type:String,
        required:true,
    },
    cnic:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
},
    {
        timestamps: true
    },

);

module.exports = mongoose.model("patient" , patientschema);