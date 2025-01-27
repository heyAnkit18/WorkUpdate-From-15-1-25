module.exports = {
    // assoctions folder was created to manage associations and remove circular dependencies
    ...require('./Associations/index'),
    // master folder    
    vehicleTypeMaster:require("./vehicalType/index")
}