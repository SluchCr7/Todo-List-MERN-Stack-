
const express = require("express");
const route = express.Router();

const {
    createNote,
    getAllNotes,
    deleteNote,
    getNoteById,
    changePriority,
    completeTask
} = require("../Controllers/NoteController");
const {verifyToken} = require("../Middelwares/verifyToken")
route.route("/")
    
    .get(getAllNotes);

route.route('/add/:id')
    .post(createNote);

route.route("/:id")
    .get(getNoteById)
    .delete(deleteNote); // ✅ تعديل هنا ليكون /api/note/:id بدلاً من /delete/:id

route.route('/priority/:id')
    .put(changePriority);

route.route('/complete/:id')
    .put(completeTask)
module.exports = route;