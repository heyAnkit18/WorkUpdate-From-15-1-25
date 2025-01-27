const Joi = require('joi');

module.exports = {
    vehicleTypeMasterjoi: Joi.object({
        vehicleTypeCode: Joi.string().required().messages({
            'string.base': 'Vehicle type code must be a string',
            'string.empty': 'Vehicle type code cannot be empty',
            'any.required': 'Vehicle type code is required',
        }),
        manufacturerName: Joi.string().required().messages({
            'string.base': 'Manufacturer name must be a string',
            'string.empty': 'Manufacturer name cannot be empty',
            'any.required': 'Manufacturer name is required',
        }),
        vehicleTypeName: Joi.string().required().messages({
            'string.base': 'Vehicle type name must be a string',
            'string.empty': 'Vehicle type name cannot be empty',
            'any.required': 'Vehicle type name is required',
        }),
        modelNo: Joi.string().required().messages({
            'string.base': 'Model number must be a string',
            'string.empty': 'Model number cannot be empty',
            'any.required': 'Model number is required',
        }),
        truckTrailer: Joi.string().required().messages({
            'string.base': 'Truck trailer must be a string',
            'string.empty': 'Truck trailer cannot be empty',
            'any.required': 'Truck trailer is required',
        }),
        tyreRotation: Joi.string().required().messages({
            'string.base': 'Tyre rotation must be a string',
            'string.empty': 'Tyre rotation cannot be empty',
            'any.required': 'Tyre rotation is required',
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string',
        }),
        vehWeight: Joi.string().optional().messages({
            'string.base': 'Vehicle weight must be a string',
        }),
        unladenWeight: Joi.string().optional().messages({
            'string.base': 'Unladen weight must be a string',
        }),
        capacity: Joi.string().optional().messages({
            'string.base': 'Capacity must be a string',
        }),
        ratePerKm: Joi.string().optional().messages({
            'string.base': 'Rate per km must be a string',
        }),
        vehicleTypeImage: Joi.string().optional().messages({
            'string.base': 'Vehicle type image must be a string',
        }),
        fuelType: Joi.string().optional().messages({
            'string.base': 'Fuel type must be a string',
        }),
        width: Joi.string().optional().messages({
            'string.base': 'Width must be a string',
        }),
        length: Joi.string().optional().messages({
            'string.base': 'Length must be a string',
        }),
        height: Joi.string().optional().messages({
            'string.base': 'Height must be a string',
        })
    })
}
