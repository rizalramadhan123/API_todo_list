const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  checklistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Item', ItemSchema);
