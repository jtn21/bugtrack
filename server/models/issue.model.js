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
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},{timestamps:true});

module.exports.Job = mongoose.model('Issue', IssueSchema)