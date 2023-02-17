const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config/index');

exports.findByEmail = (email) => User.findOne({ email });
exports.findById = (userId) => User.findById(userId).lean();

exports.register = async (username, password, repeatPassword, email) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
        throw new Error('User already exist');
    }

    //Validate password
    if (password.length < 2) {
        throw new Error('Password is too short')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, email });

    return this.login(email, password);
};

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    //Generate token
    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = await jwt.sign(payload, config.SECRET, { expiresIn: '2d' });
    return token;
} 