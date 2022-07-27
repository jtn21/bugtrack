const mongoose = require('mongoose')
// near the top is a good place to group our imports
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema





const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : [true,"First name is required"],
        minlength: [2,"Name must be at least 2 characters"]
    },
    lastName : {
        type: String,
        required : [true,"Last name is required"],
        minlength: [2,"Name must be at least 2 characters"]
    },
    email : {
        type: String,
        required : [true,"Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        minlength: [8,"Name must be at least 8 characters"]
        
    },
    password : {
        type: String,
        required : [true,"Password is required"],
        minlength: [8,"Password must be at least 8 characters"]
    },
    issues:[{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }]
});

// add this after UserSchema is defined
userSchema.virtual('confirmpw')
    .get( () => this._confirmpw )
    .set( value => this._confirmpw = value ); //this is a virtual field that will validate password matches. It will not save to mongoDB


//validate user password match before saving to db. If no match this.invalidate() creates validation error message
    userSchema.pre('validate', function(next) {
        if (this.password !== this.confirmpw) {
            this.invalidate('confirmpw', 'Password must match confirm password');
        }
        next(); // after above process done, go to next step
    });


// number is the # of salt rounds, 10 is standard
    userSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
    });



// will force use of curly braces if module.exports.product {}
module.exports.User = mongoose.model('User', userSchema) 