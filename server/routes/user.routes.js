const UserController = require('../controllers/user.controller')
const IssueController = require('../controllers/issue.controller')

module.exports = (app) =>{
    app.get("/api/test", UserController.testApi)
    app.post("/api/user/register", UserController.addUser)
    app.post('/api/user/login', UserController.login)
    app.get('/api/user/getloggedinuser', UserController.getLoggedInUser)
    app.get("/api/user", UserController.allUsers)
    app.get("/api/user/logout", UserController.logout)




    app.get('/api/issues', IssueController.getAll)
    app.get(`/api/issue/:id`, IssueController.oneIssue)
    app.post('/api/issue', IssueController.addIssue)
    app.delete(`/api/issue/:id`, IssueController.deleteIssue)
}