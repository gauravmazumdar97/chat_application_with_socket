const express = require('express');
const AuthMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();


// Create a new user================================================================================
router.post('/createUser', AuthMiddleware.verifyToken ,userController.createUser);
// Get all users
router.get('/getAllUser', AuthMiddleware.verifyToken ,userController.getAllUsers);
// =================================================================================================


// Chat API's=======================================================================================

// Chat with a specific user
/**
 * @swagger
 * /api/users/chatsWithUser/{userId}:
 *   get:
 *     summary: Get chat messages with a specific user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to fetch chat messages with
 *       - in: query
 *         name: isGroup
 *         required: true
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Set to 'false' to fetch one-on-one chat messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat messages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User fetched successfully
 *                 data:
 *                   type: object
 *                   description: Chat data
 *       404:
 *         description: User or chat not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *                 data:
 *                   type: array
 *                   example: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 data:
 *                   type: array
 *                   example: []
 */

router.post('/chatsWithUser' ,userController.chatsWithUser);
// Create Group Chat
// router.post('/createGroupChat', AuthMiddleware.verifyToken ,userController.createGroupChat);
// Group Chat with a specific users
// router.get('/groupChatWithUser/:userId', AuthMiddleware.verifyToken ,userController.groupChatWithUser);
// Get all group chats
// router.get('/getAllGroupChat', AuthMiddleware.verifyToken ,userController.getAllGroupChat);
//  Edit message
// router.put('/editMessage/:messageId', AuthMiddleware.verifyToken ,userController.editMessage);
// Delete message
// router.delete('/deleteMessage/:messageId', AuthMiddleware.verifyToken ,userController.deleteMessage);








module.exports = router;