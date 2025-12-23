const User = require("../models/User");
const Transaction = require("../models/Transaction"); // ensure this model exists

/**
 * CREATE USER
 * POST /users
 */
const createUser = async (req, res) => {
  try {
    let { userId, balance } = req.body;

    // 🔒 Cast to number
    userId = Number(userId);
    balance = Number(balance);

    // ✅ Validation
    if (isNaN(userId) || isNaN(balance)) {
      return res.status(400).json({
        success: false,
        message: 'userId and balance must be valid numbers'
      });
    }

    // check if user exists
    const exists = await User.findOne({ userId });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    // create user
    const user = new User({ userId, balance });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * GET ALL USERS
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0 }).sort({ userId: 1 });

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

/**
 * GET SINGLE USER (TEST / DEBUG PURPOSE)
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: 1 });

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};

/**
 * CREATE MULTIPLE USERS (SEEDING PURPOSE)
 */
const createUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({
        success: false,
        message: "Expected an array of users"
      });
    }

    // 🔒 Ensure all users have numeric userId and balance
    const validUsers = users.map(u => ({
      userId: Number(u.userId),
      balance: Number(u.balance) || 0
    }));

    await User.insertMany(validUsers);

    res.status(201).json({
      success: true,
      message: "Users seeded successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to seed users"
    });
  }
};

/**
 * TRANSFER FUNDS
 * POST /users/transfer
 */
const transferFunds = async (req, res) => {
  try {
    let { senderId, receiverId, amount } = req.body;

    // ✅ Ensure all fields exist
    if (senderId === undefined || receiverId === undefined || amount === undefined) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 🔒 Cast to numbers
    senderId = Number(senderId);
    receiverId = Number(receiverId);
    amount = Number(amount);

    if (isNaN(senderId) || isNaN(receiverId) || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid numeric values' });
    }

    // ✅ Check sender and receiver exist
    const sender = await User.findOne({ userId: senderId });
    const receiver = await User.findOne({ userId: receiverId });

    if (!sender) return res.status(404).json({ success: false, message: 'Sender not found' });
    if (!receiver) return res.status(404).json({ success: false, message: 'Receiver not found' });

    // ✅ Check sender balance
    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // ✅ Perform transfer
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // ✅ Record transaction
    const transaction = new Transaction({ senderId, receiverId, amount });
    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Transfer successful',
      data: transaction
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  createUsers,
  transferFunds
};
