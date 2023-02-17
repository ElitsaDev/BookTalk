const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: (true, 'Username is required'),
    },
    password: {
        type: String,
        required: (true, 'Password is required')
    },
    email: {
        type: String,
        minLength: 2,
        required: (true, 'Email is required')
    },
    wishes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }]
}, {
    virtuals: {
        repeatPassword: {
            set(value){
                if(this.password !== value){
                    throw new mongoose.Error('Password mismatch here')
                }
            },
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;