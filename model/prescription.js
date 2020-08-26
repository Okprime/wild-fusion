const mongoose = require('mongoose');

const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  name_of_prescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  usage_formula: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const prescriptionModel = mongoose.model('prescriptions', prescriptionSchema);

module.exports = prescriptionModel;
