const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        lowercase: true,
        unique: true,
        match: /^[a-zA-Z0-9]+$/
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,  
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
});

userSchema.pre('save', function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        this.password = hashedPassword;
        next();
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;