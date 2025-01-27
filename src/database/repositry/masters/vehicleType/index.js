const { vehicleTypeMaster } = require('../../../models/masters/index');
const { logger } = require('../../../../logger/index');
const config = require('../../../../config/index');

module.exports = {

    addVehicle: async (data) => {
        try {
            return await vehicleTypeMaster.create(data);
        } catch (error) {
            logger.error({ message: error.message, stack: error.stack });
            throw new Error(config.responseMessage.somethingWentWrong);
        }
    },
    

    addBulkVehicle: async (data) => {
        try {
            return await vehicleTypeMaster.bulkCreate(data);
        } catch (error) {
            logger.error({ message: error.message, stack: error.stack });
            throw new Error(config.responseMessage.somethingWentWrong);
        }
    },


    getVehicle: async (data) => {
        try {
            return await vehicleTypeMaster.findOne({ where: data });
        } catch (error) {
            logger.error({message: error.message, stack: error.stack});
            throw new Error(config.responseMessage.somethingWentWrong); 
        }
    },

    getAllVehicles: async () => {
        try {
            return await vehicleTypeMaster.findAll({ raw: true, where: { isDeleted: false } });
        } catch (error) {
            logger.error(error);
            throw new Error(config.responseMessage.somethingWentWrong);
        }
    },


    updateVehicle: async (data, find) => {
        try {
            return await vehicleTypeMaster.update(data, { where: find });
        } catch (error) {
            logger.error(error);
            throw new Error(config.responseMessage.somethingWentWrong);
        }
    },

    vehicleTypeData: async (searchObj, limit, offset) => {
        try {
            limit = parseInt(limit) || config.managers.limit;
            offset = parseInt(offset) || config.managers.skip; 

            if (offset < 0) {
                offset = 0;
            }
            
            const matchResult = await vehicleTypeMaster.findAll({
                where: searchObj,
                include: { all: true },
                limit: limit,
                offset: offset * limit,
            });
            const count = await vehicleTypeMaster.count({ where: searchObj });
            return { matchResult, count };
        } catch (error) {
            // logger.error({ message: error.message, stack: error.stack });
            // throw new Error(config.responseMessage.notFound);
            logger.error({message:error.message,stack:error.stack});
            throw new Error(config.responseMessage.somethingWentWrong);
        }
    },
};