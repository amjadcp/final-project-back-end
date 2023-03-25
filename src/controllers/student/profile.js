const Student = require('../../models/student');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

module.exports = {
    getProfile : catchAsync(async (req, res, next) => {
        const profile = await Student.findById(req.params.id);
        if (!profile) {
            return next(new AppError('Profile not found for given student ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                profile,
            },
        });
    }),
    editProfile : catchAsync(async (req, res, next) => {
        const profile = await Student.findById(req.params.id);
        if (!profile) {
            return next(new AppError('Profile not found for given student ID', 404));
        }

        const updatedProfile = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            status: 'success',
            data: {
                updatedProfile,
            },
        });
    }),
    
}