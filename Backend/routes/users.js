const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUser,
  createUsers,
  transferFunds
} = require('../controllers/UserController'); // make sure the controller file exports transferFunds

// POST /users -> create a single user
router.post('/', createUser);

// GET /users -> get all users
router.get('/', getAllUsers);

// GET /users/single -> test route for a single user
router.get('/single', getUser);

// POST /users/seed -> optional: create multiple users
router.post('/seed', createUsers);

// POST /users/transfer -> transfer funds between users
router.post('/transfer', transferFunds);

module.exports = router;
