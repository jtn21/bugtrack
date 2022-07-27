const {Issue} = require ('../models/issue.model')
const { User } = require('../models/user.model')




//get one issue
module.exports.oneIssue = (req,res) =>{
    Issue.findOne({_id:req.params.id})
        .then(oneIssue=>res.json(oneIssue))
        .catch(err=>res.status(400).json(err))
}
    
// add issue

module.exports.addIssue =  async(req,res) =>{
    try{
        const newIssue = new Issue(req.body)
        newIssue.user = req.params.userId
        await newIssue.save()

        const foundUser = await User.findOne({_id:req.params.userId})
        foundUser.issues.push(newIssue)
        await foundUser.save()

        res.json(newIssue)
    }catch(err){
        res.status(400).json(err)
    }
}