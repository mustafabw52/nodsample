var express = require('express');
var router = express.Router();
var AnkhorController = require('../app/api/controllers/ankhor');
var AuthHelpers = require('../helpers/auth_helpers');
var passport = require('passport');
var config = require('../config');

router.post('/sign-up',authController.signup);
router.post('/login',authController.login);
router.post('/user-list',userController.signup);
router.post('/project-list',projectController.signup);
router.post('/user/project',userController.signup);
router.post('/project/:id/users',userController.signup);

module.exports = router;


//Let's assume the following scenario:
//1. There are "projects" and "users"
//2. A "user" can be assigned to multiple "projects" and a "project" could have multiple "users".
//3. Each "user" inside a project has a role. It is either "manager" or "developer".
//4. There is also a "superadmin" role for one particular user.
//5. The "superadmin" user can see all the "projects" and all the "users" assigned to any of the project.
//6. A "user" can see all the "projects" assigned to him/her.
//7. If a "user" is a "manager" for a particular project, then he/she can see all the other "users" in that project.
//8. If a user is a "developer" in a particular project, then they can not see the other users in that project.
//9. A "user" can be "manager in project 1, but could be developer in project 2.
//
