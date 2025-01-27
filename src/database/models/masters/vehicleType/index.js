const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../index');

const vehicleTypeMaster = sequelize.define('vehicleTypeMaster', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vehicleTypeCode: {
        type: DataTypes.STRING
    },
    manufacturerName: {
        type: DataTypes.STRING
    },
    vehicleTypeName: {
        type: DataTypes.STRING
    },
    modelNo: {
        type: DataTypes.STRING
    },
    truckTrailer: {
        type: DataTypes.STRING
    },
    tyreRotation: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    vehWeight: {
        type: DataTypes.STRING
    },
    unladenWeight: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.STRING
    },
    ratePerKm: {
        type: DataTypes.STRING
    },
    vehicleTypeImage: {
        type: DataTypes.STRING
    },
    fuelType: {
        type: DataTypes.STRING
    },
    width: {
        type: DataTypes.STRING
    },
    length: {
        type: DataTypes.STRING
    },
    height: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    tableName: 'vehicleTypeMaster'
});

module.exports = vehicleTypeMaster;