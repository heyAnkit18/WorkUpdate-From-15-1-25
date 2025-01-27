const express = require('express');
const { validatePayload } = require('../../../middleware/index')
const { createVehicleType,
    searchVehicleType,
    uploadVehicleTypeDetails,
    removeVehicleType,
    updateVehicleType,
    downloadVehicleTypeDetails,
    vehicleTypeManager } = require('../../../../services/index');

const router = express.Router();
const { multercsv } = require('../../../../config/index')
router.post('/create', validatePayload('vehicleTypeMasterjoi'), createVehicleType);
router.get('/get/:id', searchVehicleType);
router.put('/delete/:id', removeVehicleType);
router.put('/update/:id', updateVehicleType);
router.post('/upload', multercsv.single('csvfile'), uploadVehicleTypeDetails);
router.get('/download', downloadVehicleTypeDetails);
router.get('/manager', vehicleTypeManager);

module.exports = router;
