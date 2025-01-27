const {Sequelize}= require("sequelize");

const config=require('../config/index')

const sequelize=new Sequelize(config.db)
try {
    sequelize.authenticate()
    console.log('Connection has been established successfully with Database');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
sequelize.sync({alter:true})
module.exports= {sequelize}