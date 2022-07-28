const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new mongoose.Schema({
    subject : {
        type: String,
        required: [true, 'Please select the class']
    },
    description : {
        type: String,
        required : [true, "Please describe the issue"]
    },
    priority : {
        type: String,
        required : [true, "Please select the priority level"]
    },
    assigned : {
        type: String,
        required: [true, "Please select person"]
    },
    resolved : {
        type: Boolean
    },
    userId : {
        type: String
    },
    firstName : {
        type: String
    },
    lastName: {
        type: String
    }

},{timestamps:true});

module.exports.Issue = mongoose.model('Issue', IssueSchema)

// userID is going to grab to the object id
// user is set to grab data from results.