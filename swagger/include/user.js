
/**
 * @swagger
 * resourcePath: /users
 * description: All about API
 */


/**
 * @swagger
 * path: /api/signup
 * operations:
 *   -  httpMethod: POST
 *      summary: signup
 *      notes: signup
 *      responseClass: SignUp
 *      nickname: singup
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Login with facebook
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/login
 * operations:
 *   -  httpMethod: POST
 *      summary: Signup with username and password & other details
 *      notes: Returns a user based on username
 *      responseClass: LogIn
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: User Details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/logout
 * operations:
 *   -  httpMethod: GET
 *      summary: user logout
 *      notes: user logout
 *      nickname: logout
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          description: Access token
 *          paramType: query
 *          required: true
 *          dataType: string
 */

/**
 * @swagger
 * path: /api/user-list
 * operations:
 *   -  httpMethod: GET
 *      summary: user list
 *      notes: user list
 *      nickname: list
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          description: Access token
 *          paramType: query
 *          required: true
 *          dataType: string
 */

/**
 * @swagger
 * path: /api/user/{user_id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: delete user
 *      notes: delete user
 *      nickname: deleteUser
 *      consumes: 
 *        - text/html
 *      parameters:       
 *        - name: user_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: User id
 */


exports.login = function (req, res) {
  var user = {};
  user.email = req.param('email');
  user.password = req.param('password');
  res.json(user);
}
exports.signup = function (req, res) {
  var user = {};
  user.user_type = req.param('user_type');
  user.first_name = req.param('first_name');
  user.last_name = req.param('last_name');
  user.email = req.param('email');
  user.password = req.param('password');
  user.phone_number = req.param('phone_number');
  user.address = req.param('address');
  user.state = req.param('state');
  user.city = req.param('city');
  user.device_type = req.param('device_type');
  user.device_id = req.param('device_id');
  user.certification_type = req.param('certification_type');
  res.json(user);
}
 
/**
 * @swagger
 * models:
 
 *   SignUp:
 *     id: SignUp
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String 
 *       user_type:
 *         type: String
 *   LogIn:
 *      id: ForgogePassword  
 *      properties:
 *       username:
 *         type: String   
 *       password:
 *         type: String   
 */