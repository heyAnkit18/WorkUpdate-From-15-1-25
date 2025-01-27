const fs = require('fs');
const { promisify } = require('util');
const writeCSVFile = promisify(fs.writeFile);
const path = require('path');
const { Parser } = require('json2csv');
const { Op } = require('sequelize');
const {
    addVehicle,
    addBulkVehicle,
    getVehicle,
    updateVehicle,
    vehicleTypeData,
    getAllVehicles
} = require('../../../database/repository/masters/vehicalType');
const { AppError, readFile } = require('../../../utility/index');
const config = require('../../../config/index');
const { logger } = require('../../../logger/index');
const { stack } = require('../../../api');

module.exports = {

    createVehicleType: async (req, res, next) => {
        try {
            const { ...data } = req.body;
            const existingVehicle = await getVehicle({
                vehicleTypeName: data.vehicleTypeName,
                vehicleTypeCode: data.vehicleTypeCode, modelNo: data.modelNo
            });
            if (existingVehicle) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.exist,
                    result: null
                });
            }

            const newVehicle = await addVehicle(data);
            if (!newVehicle) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.notCreate,
                    result: null
                });
            }

            return res.status(201).json({
                success: true,
                message: config.responseMessage.create,
                result: newVehicle
            });

        } catch (error) {
            logger.error({
                stack: error.stack,
                message: error.message,
                master: "vehicleType"
            });
            next(new AppError(config.responseMessage.somethingWentWrong, 400));
           
        }
    },


    searchVehicleType: async (req, res, next) => {
        const { id } = req.params;
        try {
            const vehicle = await getVehicle({ id, isDeleted: false });

            if (!vehicle) {
                return res.status(404).json({
                    success: false,
                    message: config.responseMessage.notFound,
                    result: null,
                });
            }

            return res.status(200).json({
                success: true,
                message: config.responseMessage.found,
                result: vehicle,
            });

        } catch (error) {
            logger.error({
                stack: error.stack,
                message: error.message,
                master: "vehicleType"
            });
            next(new AppError(config.responseMessage.somethingWentWrong, 500));
           
        }
    },


    removeVehicleType: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteResult = await updateVehicle({ isDeleted: true }, { id });
            if (deleteResult[0] !== 1) {
                return res.status(400).json({
                    success:false,
                    message:config.responseMessage.notFound,
                    result:null

                });
            }

            return res.status(200).json({
                success: true,
                message: config.responseMessage.delete,
                result: null
            });

        } catch (error) {
            logger.error({
                stack: error.stack,
                message: error.message,
                master: "vehicleType"
            });
            next(new AppError(config.responseMessage.somethingWentWrong, 400));
        }
    },

    updateVehicleType: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            // First, check if the vehicle type exists
            const vehicle = await getVehicle({ id });
            if (!vehicle) {
                return res.status(404).json({
                    success: false,
                    message: 'Vehicle type not found',
                    result: " "
                });
            }

            // If the vehicle exists, proceed to update
            const result = await updateVehicle(data, { id });

            if (result[0] == 0) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.notUpdate,
                    result: " "
                });
            }

            return res.status(200).json({
                success: true,
                message: config.responseMessage.update,
                result: " "
            });
        } catch (error) {
            logger.error({
                message: error.message,
                stack: error.stack
            });
            next(new AppError(error.message, 400));
        }
    },

    uploadVehicleTypeDetails: async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.fileNotFound,
                    result: null
                });
            }

            const filePath = req.file.path;
            let data;

            try {
                data = await readFile(filePath);
                data = JSON.parse(JSON.stringify(data));
            } catch (fileError) {
                console.error(fileError);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid file content or format.',
                    result: null
                });
            }

            if (!Array.isArray(data) || data.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.notFound,
                    result: null
                });
            }

            const filteredData = [];
            for (let i = 0; i < data.length; i++) {
                const item = data[i];

                if (!item.vehicleTypeCode) {
                    return res.status(400).json({
                        success: false,
                        message: `vehicleTypeCode is missing at index ${i}`,
                        result: null
                    });
                }

                const vehicleDetail = {
                    isDeleted: item.isDeleted || false,
                    vehicleTypeCode: item.vehicleTypeCode,
                    manufacturerName: item.manufacturerName,
                    vehicleTypeName: item.vehicleTypeName,
                    modelNo: item.modelNo,
                    truckTrailer: item.truckTrailer,
                    tyreRotation: item.tyreRotation,
                    description: item.description,
                    vehWeight: item.vehWeight,
                    unladenWeight: item.unladenWeight,
                    capacity: item.capacity,
                    ratePerKm: item.ratePerKm,
                    vehicleTypeImage: item.vehicleTypeImage,
                    fuelType: item.fuelType,
                    width: item.width,
                    length: item.length,
                    height: item.height,
                };

                const existingVehicleDetails = await getVehicle({ vehicleTypeCode: vehicleDetail.vehicleTypeCode });
                if (!existingVehicleDetails) {
                    filteredData.push(vehicleDetail);
                }
            }

            if (filteredData.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: config.responseMessage.exist,
                    result: null
                });
            }

            const newVehicleDetails = await addBulkVehicle(filteredData);
            return res.status(200).json({
                success: true,
                message: config.responseMessage.upload,
                result: newVehicleDetails
            });
        } catch (error) {
            logger.error({
                stack: error.stack,
                message: error.message,
                master: "vehicleType"
            });
            next(new AppError(config.responseMessage.somethingWentWrong, 400));
        }
    },
  
    vehicleTypeManager: async (req, res, next) => {
        try {
            let { vehicleTypeName, vehicleTypeCode, offset, limit } = req.body;
            let searchObj = {};
            searchObj = {
                isDeleted: false,
                [Op.or]: [
                    { vehicleTypeName: { [Op.iLike]: `%${vehicleTypeName}%` } },
                    { vehicleTypeCode: { [Op.iLike]: `%${vehicleTypeCode}%` } }
                ]
            }
            // console.log(searchObj)
            let newManger = await vehicleTypeData(searchObj, limit, offset);
            if (!newManger) {
                return res.status(401).json({
                    success: false,
                    message: config.responseMessage.notFound,
                    result: null
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: config.responseMessage.found,
                    result: newManger
                })
            }
        } catch (error) {
            logger.error({
                stack: error.stack
            })
            next(new AppError(error.message, 400));
        }
    },
    /**
     * Downloads all vehicle type records as a CSV file.
     * This function retrieves all vehicle type records from the database.
     * If no data is found, it responds with a 404 error message.
     * It converts the data into CSV format and writes it to a file.
     * The file is then sent to the client for download.
     * In case of a failure during file creation or download, it responds with a 500 error message.
     * 
     * Responses:
     * 200: File downloaded successfully.
     * 404: No vehicle type data found.
     * 500: Failed to create or download the file.
     */
    downloadVehicleTypeDetails: async (req, res, next) => {
        try {
            const allData = await getAllVehicles();
            if (!allData || !allData.length) {
                return res.sendFile(path.join(__dirname, '../../../../public/downloadNotAvailable.html'));
            }
            // Convert Sequelize instances to plain objects

            const fields = Object.keys(allData && allData[0]);
            const json2csvParser = new Parser({ fields });
            const csvData = json2csvParser.parse(allData);

            const filePath = path.join(__dirname, 'vehicalType.csv');
            await writeCSVFile(filePath, csvData);
            res.download(filePath, 'vehicalType.csv', (err) => {
                if (err) {
                    fs.unlinkSync(filePath);
                    return res.sendFile(path.join(__dirname, '../../../../public/downloadFailed.html'));
                } else {
                    fs.unlinkSync(filePath);
                    return;
                }
            });
        } catch (error) {
            logger.error({
                stack: error.stack
            })
            next(new AppError(error.message, 400));
        }
    },

};