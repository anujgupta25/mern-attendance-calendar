const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
    date : String,
    status : String
})

const Model = mongoose.model("Attendances", AttendanceSchema)
module.exports = Model
