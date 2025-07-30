const { Note, validateNewNote } = require('../Models/Note')
const asyncHandler = require("express-async-handler");

/**
 * @desc Create note
 * @route POST /api/notes
 * @access Private
 */

const createNote = asyncHandler(async (req, res) => {
    const { error } = validateNewNote(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        isComplete: req.body.isComplete,
        userId: req.params.id,
        priority: req.body.priority
    });

    await note.save();
    res.status(200).send(note);
});

/**
 * @desc get All notes
 * @route GET /api/notes
 * @access Private
 */

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    res.status(200).send(notes);
});

/**
 * @desc delete note
 * @route DELETE /api/note/:id
 * @access Private
 */

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json("Note not found.");

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Note deleted successfully." });
});

/**
 * @desc get Note by id
 * @route GET /api/note/:id
 * @access Private
 */

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json("Note not found.");
    res.status(200).json(note);
});

/**
 * @desc Change Priority
 * @route PUT /api/note/priority/:id
 * @access Private
 */

const changePriority = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json("Note not found.");

    note.priority = req.body.priority;
    await note.save();
    res.status(200).json(note);
});

const completeTask = asyncHandler(async (req, res) => {
    const task = await Note.findById(req.params.id)
    if (!task) return res.status(404).json("Note not found.");

    task.isComplete = true;
    task.completedAt = Date.now();
    await task.save();
    res.status(200).json(task);
})

module.exports = {
    createNote,
    getAllNotes,
    deleteNote,
    getNoteById,
    changePriority,
    completeTask
}