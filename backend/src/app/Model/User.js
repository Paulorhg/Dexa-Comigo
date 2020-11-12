const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    friends:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);
// Exportar o modelo
module.exports = User;
