const {Issue} = require ('../models/issue.model')
const { User } = require('../models/user.model')


//delete issue
module.exports.deleteIssue = (req,res) => {
    Issue.deleteOne({_id: req.params.id})
        .then(message => res.json(message))
        .catch(err=> res.son(err))
    
}



// add issue

module.exports.addIssue =  async(req,res) =>{
    try{
        const newIssue = new Issue(req.body)
        await newIssue.save()

        const updatedUser = await User.findOneAndUpdate(
            {_id:newIssue.userId},
            {$push: {issues : newIssue}},
            {new : true}
            )
        res.json(updatedUser)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports.getAll = (req, res) => {
    Issue.find()
        .then(issues => res.json(issues))
        .catch(err => res.json(err))
}


//get one issue
module.exports.oneIssue = (req,res) =>{
    Issue.findOne({_id:req.params.id})
        .then(oneIssue=>res.json(oneIssue))
        .catch(err=>res.status(400).json(err))
}
    



