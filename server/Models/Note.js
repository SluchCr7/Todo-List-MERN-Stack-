const mongoose = require("mongoose");
const joi = require('joi')
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  completedAt: {
    type: Date
  },
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);

const validateNewNote = (note) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    isComplete: joi.boolean(),
    priority: joi.string().valid('low', 'medium', 'high'),
  });
  return schema.validate(note);
};

module.exports = { Note, validateNewNote };