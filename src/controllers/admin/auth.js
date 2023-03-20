const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');
const { promisify } = require('util');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const crypto = require('crypto');

// signToken function takes an id as an argument and creates a JWT with that id as the payload
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}
// createSendToken function takes a user object, status code, and response object as arguments
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;
    // send a JSON response containing the token and user data
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });

};

module.exports = {
    signup: catchAsync(async (req, res, next) => {

        //checks if the user already exists
        const existingUser = await Admin.findOne({ email: req.body.email });
        if (existingUser) {
            return next(new AppError('user already exists , Try logging in!', 400));
        }

        const newUser = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        //calls the createSendToken function to create and send a JWT to the client
        createSendToken(newUser, 201, res);

    }),
    login: catchAsync(async (req, res, next) => {   //authenticating a user with the provided email and password fields from the request body

        const { email, password } = req.body;

        //checks if the email and password fields are present
        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }

        const user = await Admin.findOne({ email }).select('+password');  //fetch the user data from the database
        if (!user || !await user.correctPasswords(password, user.password)) {
            return next(new AppError('Incorrect Email or password!', 404));
        }

        createSendToken(user, 200, res);

    }),
    logout: (req, res) => { //logout function
        res.cookie('jwt', 'loggedout', {                  //clears the cookie
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });
        res.status(200).json({ status: 'Logout success' });
    },
    protect: catchAsync(async (req, res, next) => {
        
        // Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        // Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user still exists
        const currentUser = await Admin.findById(decoded.id);
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }

        // Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(
                new AppError('User recently changed password! Please log in again.', 401)
            );
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    })
}