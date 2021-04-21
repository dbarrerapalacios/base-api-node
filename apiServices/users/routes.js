var express = require("express");
var router = express.Router();
const controllers = require("./controller");
const token = require("./../../services/token");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * /users:
 *    get:
 *      description: Use to return all users
 *      tags:
 *        - Users
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: page
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *        - name: limit
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *        - name: filter
 *          in: query
 *          required: false
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: users
 *          schema:
 *            properties:
 *              page:
 *                type: number
 *              total_page:
 *                type: number
 *              total_rows:
 *                type: number
 *              data:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    name:
 *                      type: string
 *                    last_name:
 *                      type: string
 *                    email:
 *                      type: string
 */
router.get("/", controllers.list);

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      description: Use to return all users
 *      tags:
 *        - Users
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: string
 *      responses:
 *        200:
 *          description: users
 *          schema:
 *            properties:
 *              name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 */
router.get("/:id", controllers.detail);
/**
 * @swagger
 * /users/:
 *    post:
 *      description: Use to return all users
 *      tags:
 *        - Users
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: users
 *          schema:
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 */
router.post("/", controllers.create);
/**
 * @swagger
 * /users/login:
 *    post:
 *      description: Use to return all users
 *      tags:
 *        - Users
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: users
 *          schema:
 *            properties:
 *              token:
 *                type: string
 *              name:
 *                type: string
 */
router.post("/login", controllers.login);


router.use(token.authentication);

module.exports = router;
