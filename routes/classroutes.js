const express = require('express')
const mongoose = require('mongoose')
const { ClassDB, StudentDB } = require('../models/Schema')

const router = express.Router()


let seqid = 0


// router.post('/', async (req, res) => {
//     try {
//         const classid = ClassidDB.findOneAndUpdate(
//             { idname: 'myclassid' },
//             { $inc: { seq: 1 } },
//             { new: true },
//             async (counterDB) => {
//                 console.log(counterDB)
//                 if (counterDB == null) {
//                     const classid1 = new ClassidDB({ idname: 'myclassid', seq: 1 })
//                     classid1.save()
//                     seqid = 1
//                 } else {
//                     seqid = counterDB.seq
//                 }
//                 const Classes = await ClassDB.create({
//                     id: seqid,
//                     class: req.body.class,
//                     studentCount: req.body.studentCount
//                 })
//                 res.status(200).json({
//                     class: Classes,
//                     status: "class created"
//                 })
//             }

//         )
//     } catch (e) {
//         res.status(400).json({
//             status: 'class not created',
//             message: e.message

//         })
//         console.log(e.message)
//     }
// })
//--------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {

        const Classes = await ClassDB.create({
            class: req.body.class,
            studentCount: req.body.studentCount
        })
        res.status(201).json({
            id: Classes._id,
            status: "class created"
        })


    } catch (e) {
        res.status(400).json({
            status: 'class not created',
            message: e.message

        })

    }
})

//--------------------------------------------------------------------------------------------------------------------------------
router.post('/:myClassId/students', async (req, res) => {
    try {

        const student = await StudentDB.create({
            name: req.body.name,
            classId: req.params.myClassId
        })
        res.status(201).json({
            studentid: student._id,
            status: "student created"
        })


    } catch (e) {
        res.status(400).json({
            status: 'student not created',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {

        const Classes = await ClassDB.find()
        res.status(200).json({
            id: Classes,
            status: "classes fetched"
        })


    } catch (e) {
        res.status(400).json({
            status: 'class not fetched',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.get('/:myClassId', async (req, res) => {
    try {
        // console.log(req.params.myClassId)
        const Classes = await ClassDB.findOne({ _id: req.params.myClassId })
        res.status(200).json({
            class: Classes,
            status: "classes fetched"
        })


    } catch (e) {
        res.status(400).json({
            status: 'class not fetched',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.get('/:myClassId/students', async (req, res) => {
    try {
        // console.log(req.params.myClassId)
        const students = await StudentDB.find({ classId: req.params.myClassId })
        res.status(200).json({
            students: students,
            status: "student fetched"
        })


    } catch (e) {
        res.status(400).json({
            status: 'There are no Students in this class',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.get('/:myClassId/students/:studentId', async (req, res) => {
    try {
        // console.log(req.params.myClassId)
        const students = await StudentDB.find({ $and: [{ classId: req.params.myClassId }, { _id: req.params.studentId }] })
        res.status(200).json({
            students: students,
            status: "student fetched"
        })


    } catch (e) {
        res.status(400).json({
            status: 'There are no Students in this class',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.put('/:myClassId/students/:studentId', async (req, res) => {
    try {
        // console.log(req.params.myClassId)
        const students = await StudentDB.findOneAndUpdate({ $and: [{ classId: req.params.myClassId }, { _id: req.params.studentId }] }, req.body)
        res.status(204).json({
            students: students,
            status: "student Updated"
        })


    } catch (e) {
        res.status(404).json({
            status: 'There are no Students in this class',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.delete('/:myClassId', async (req, res) => {
    try {

        const Classes = await ClassDB.findOneAndDelete({ _id: req.params.myClassId })
        res.status(204).json({
            class: Classes,
            status: "classes fetched"
        })


    } catch (e) {
        res.status(404).json({
            status: 'class not fetched',
            message: e.message

        })

    }
})
//--------------------------------------------------------------------------------------------------------------------------------
router.delete('/:myClassId/students/:studentId', async (req, res) => {
    try {

        const students = await StudentDB.deleteOne({ $and: [{ classId: req.params.myClassId }, { _id: req.params.studentId }] })
        res.status(204).json({
            students: students,
            status: "student Deleted"
        })


    } catch (e) {
        res.status(404).json({
            status: 'There is no task at that id',
            message: e.message

        })

    }
})


module.exports = router