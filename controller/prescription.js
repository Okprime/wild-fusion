/* eslint-disable */
const { prescriptionSchema } = require('../schema/prescription');
const prescriptionService = require('../service/prescription');

module.exports = {
  async saveAPrescription(req, res) {
    const { decoded } = req;
    await prescriptionSchema.validateAsync(req.body);
    req.body.email = decoded.email;

    const result = await prescriptionService.saveAPrescription(req.body);
    console.log('result', result);
    return res.successResponse({
      message: 'Prescription saved successfully',
      data: result,
    });
  },

  async deleteAPrescription(req, res) {
    const { id } = req.params;
    const result = await prescriptionService.deleteAPrescription(id);
    if (result === null) {
      return res.successResponse({
        message: 'Prescription has already been deleted',
      });
    }
    return res.successResponse({
      message: 'Prescription was deleted successfully',
      data: result,
    });
  },

  async verifyDrugCompletion(req, res) {
    const { status } = req.query;
    if (status === 'true') {
      return res.successResponse({
        message: 'Congratulations!!! You have completed your prescription',
      });
    } else {
      return res.errorResponse({
        message: 'Oh well, do take care of your self',
      });
    }
  }
};
