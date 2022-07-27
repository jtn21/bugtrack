const UserController = require('../controllers/user.controller')
const IssueController = require('../controllers/issue.controller')

module.exports = (app) =>{
    app.get("/api/test", UserController.testApi)
    app.post("/api/user/register", UserController.addUser)
    app.post('/api/user/login', UserController.login)
    app.get('/api/user/getloggedinuser', UserController.getLoggedInUser)
    app.get("/api/user", UserController.allUsers)
    app.get("/api/user/logout", UserController.logout)
    // app.put("/api/user/:id", UserController.updateUser)
    // app.delete("/api/user/:id", UserController.deleteUser)


    app.get('/api/user/:userId/issue', UserController.allIssues)
    app.get("/api/issue/:userId", IssueController.oneIssue)
    app.post('api/issue/addIssue', IssueController.addIssue)
}