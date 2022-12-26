const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Class_schema = new Schema({
    class: { type: String, required: true },
    studentCount: { type: Number, required: true }
})
const Student_schema = new Schema({
    name: { type: String, required: true },
    classId: { type: String, required: true }
})

const ClassDB = mongoose.model('ClassDB', Class_schema)

const StudentDB = mongoose.model('StudentDB', Student_schema)


module.exports = { ClassDB, StudentDB }