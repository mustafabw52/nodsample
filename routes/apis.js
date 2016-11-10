!(function() {
    'use strict';
    var express = require('express')
        , router = express.Router()
        , projectController = require('../controllers/project')
        , projectUsersController = require('../controllers/project_users')
        , userController = require('../controllers/user')
        , Auth = require('../lib/Auth');

        router.post('/signup', userController.signup);
        router.post('/login', userController.login);
        router.get('/logout', userController.logout);
        router.get('/user-list', Auth.isSuperAdminAuthenticated,userController.list);
        router.delete('/user/:id', userController.delete);
        router.post('/project', projectController.create);
        router.get('/project/project-list', projectController.projectList);
        router.post('/user/project', projectUsersController.create);
        router.get('/project/:id/users',Auth.isManagerAuthenticated, projectUsersController.projectUsers);
        
    module.exports = router;
})();