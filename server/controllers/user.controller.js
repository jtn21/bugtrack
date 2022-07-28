const {response} = require('express');
const userRoutes = require('../routes/user.routes');
const {User} = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



module.exports.testApi = (req,res)=>{
    res.json({status:'ok'})
}

//get all
module.exports.allUsers = (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
}


//create
//line #43 --> email:message was used to make message fall in line with the other messages from registration. Made call similar to other calls.

module.exports.addUser = (req, res) => {
    const newUser = req.body;
    User.find({email: newUser.email})
        .then(usersWithEmail=>{
            console.log("response when finding user", usersWithEmail)
            if (usersWithEmail.length ===0){
                User.create(newUser)
                .then(user => {
                    const userToken = jwt.sign({
                        id: user._id
                    }, process.env.SECRET_KEY);
                    res
                        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                            httpOnly: true
                        })
                        .json({ msg: "success!", user: user });
                })
                .catch(err => res.json(err));
            }else{
                res.json({errors: {email:{message:"Email already in use"}}})
            }
        })
        .catch(err=>console.log('err!', err))
}




//update
module.exports.updateUser = (req, res) => {
    const idFromParams = req.params.id;
    const updateValue = req.body
    User.findOneAndUpdate(
        {_id: idFromParams},
        updateValue,
        {new: true, runValidators: true}
    )
        .then(updateUser => res.json(updateUser))
        .catch(err=> res.status(400).json(err))
}


//delete

module.exports.deleteUser = (req,res) => {
    User.deleteOne({_id: req.params.id})
        .then(message => res.json(message))
        .catch(err=> res.son(err))
    
}


module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email }); //see if user exists in db

    if(user === null) {
        // email not found in users collection
        return res.json({error:"User not found"});
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // password wasn't a match!
        return res.json({error: "Password is incorrect!"});
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}


// get one
module.exports.getLoggedInUser = (req, res) => {
    console.log(req.cookies)
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
    User.findOne({_id: decodedJWT.payload.id})
        .then(foundUser=>{
            res.json({results:foundUser})
        })
        .catch(err=>{res.json((err))
        })
}

// make sure that cookie 'usertoken' matches all instances of being used
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}


//get all issues
module.exports.allIssues = (req,res) => {
    Issue.find({user: req.params.userId})
        .then(issues => res.json(issues))
        .catch(err=> res.status(400).json(err))
}



//update
// module.exports.updateUser = (req, res) => {
//     const idFromParams = req.params.id;
//     const updateValue = req.body
//     User.findOneAndUpdate(
//         {_id: idFromParams},
//         updateValue,
//         {new: true, runValidators: true}
//     )
//         .then(updateUser => res.json(updateUser))
//         .catch(err=> res.status(400).json(err))
// }


