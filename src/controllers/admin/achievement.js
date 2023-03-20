const Achievement = require('../../models/Achievement');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

module.exports = {
    addAchievement : catchAsync(async (req, res, next) => {
        req.body.password = req.body.dob
        const achievement = await Achievement.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                achievement,
            },
        });
    }),
    deleteAchievement : catchAsync(async (req, res, next) => {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return next(new AppError('No Achievement found with that ID', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }),
    getAllAchievements : catchAsync(async (req, res, next) => {
        const achievements = await Achievement.find();
        res.status(200).json({
            status: 'success',
            results: achievements.length,
            data: {
                achievements,
            },
        });
    }),
}