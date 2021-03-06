const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{type:String, required:true},
    email: {type:String},
    password: {
        type: String,
        required : [true, 'Password is required'],
        validate: {
            validator : (password) => password.length > 5,
            message: 'Password field must be longer than 5 charaters'
        }
    },
    mobile:{type:Number},
    createdOn : {type:Date, default:Date.now()}
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next()

    this.password = this.encryptPassword(this.password);
    next()
});

// instance methods
userSchema.methods = {
    encryptPassword : function(plainTextPassword) {
        if(!plainTextPassword){
            return ''
        } else {
            let salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(plainTextPassword,salt);
        }
    },
    authenticate: function(plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    }
}



module.exports = mongoose.model('users', userSchema);