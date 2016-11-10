
/**
 * @swagger
 * resourcePath: /project
 * description: All about API
 */


/**
 * @swagger
 * path: /api/project
 * operations:
 *   -  httpMethod: POST
 *      summary: Create Project
 *      notes: Create Project
 *      responseClass: Project
 *      nickname: Project
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: create project
 *          paramType: body
 *          required: true
 *          dataType: body
 */

/**
 * @swagger
 * path: /api/project/project-list
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all projects list
 *      notes:  Get all projects list
 *      nickname: projects
 *      consumes: 
 *        - text/html
 *        
 */


 
 /**
 * @swagger
 * path: /api/user/project
 * operations:
 *   -  httpMethod: POST
 *      summary: Assign project to user
 *      notes: Assign project to user
 *      responseClass: AssignProject
 *      nickname: AssignProject
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: Update user profile
 *          paramType: body
 *          required: true
 *          dataType: body
 */
 
 /**
 * @swagger
 * path: /api/project/{id}/users
 * operations:
 *   -  httpMethod: GET
 *      summary: Project users
 *      notes:  Project users
 *      nickname: ProjectUsers
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: Project ID    
 */
/**
 * @swagger
 * models:
 
 *   Project:
 *     id: Project
 *     properties:
 *       project_name:
 *         type: String 
 *   AssignProject:
 *     id: AssignProject
 *     properties:
 *       project_id:
 *         type: String  
 *       user_id:
 *         type: String 
 *       user_role:
 *         type: String                        
 */