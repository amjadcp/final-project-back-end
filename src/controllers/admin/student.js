const Student = require('../../models/student');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

module.exports = {
    addStudent : catchAsync(async (req, res, next) => {
        req.body.password = req.body.dob
        const student = await Student.create(req.body);
        student.password = undefined;
        res.status(201).json({
            status: 'success',
            data: {
                student,
            },
        });
    }),
    deleteStudent : catchAsync(async (req, res, next) => {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return next(new AppError('No student found with that ID', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }),
    getAllStudents : catchAsync(async (req, res, next) => {
        const students = await Student.find();
        res.status(200).json({
            status: 'success',
            results: students.length,
            data: {
                students,
            },
        });
    }),
    getOneStudent : catchAsync(async (req, res, next) => {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return next(new AppError('No student found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                student,
            },
        });
    }),
}