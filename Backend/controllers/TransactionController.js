const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Transfer funds (number-based with success/failed recording)
exports.transferMoney = async (req, res) => {
  let senderIdNum = Number(req.body.senderId);
  let receiverIdNum = Number(req.body.receiverId);
  let amountNum = Number(req.body.amount);

  console.log('SenderId type:', typeof senderIdNum, senderIdNum);
  console.log('ReceiverId type:', typeof receiverIdNum, receiverIdNum);
  console.log('Amount type:', typeof amountNum, amountNum);

  try {
    if (isNaN(senderIdNum) || isNaN(receiverIdNum) || isNaN(amountNum)) {
      return res.status(400).json({ message: 'All fields must be numbers' });
    }

    if (senderIdNum === receiverIdNum) {
      return res.status(400).json({ message: 'Sender and receiver cannot be the same' });
    }

    if (amountNum <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const sender = await User.findOne({ userId: senderIdNum });
    const receiver = await User.findOne({ userId: receiverIdNum });

    if (!sender || !receiver) {
      const failedTransaction = await Transaction.create({
        senderId: senderIdNum,
        receiverId: receiverIdNum,
        amount: amountNum,
        status: 'Failed'
      });
      return res.status(404).json({
        message: 'Sender or receiver not found',
        transaction: failedTransaction
      });
    }

    if (sender.balance < amountNum) {
      const failedTransaction = await Transaction.create({
        senderId: senderIdNum,
        receiverId: receiverIdNum,
        amount: amountNum,
        status: 'Failed'
      });
      return res.status(400).json({
        message: 'Insufficient balance',
        transaction: failedTransaction
      });
    }

    sender.balance -= amountNum;
    receiver.balance += amountNum;
    await sender.save();
    await receiver.save();

    const successTransaction = await Transaction.create({
      senderId: senderIdNum,
      receiverId: receiverIdNum,
      amount: amountNum,
      status: 'Success'
    });

    res.status(200).json({
      message: 'Transfer successful',
      transaction: successTransaction
    });

  } catch (err) {
    await Transaction.create({
      senderId: senderIdNum,
      receiverId: receiverIdNum,
      amount: amountNum,
      status: 'Failed'
    });

    res.status(500).json({ message: 'Transfer failed', error: err.message });
  }
};

// Get all transactions (latest first)
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
