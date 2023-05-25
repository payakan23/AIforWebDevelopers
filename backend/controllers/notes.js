const notes = [{
    id: 1, title: "This is my first note", body: "Blah blah blah"
}, {
    id: 2, title: "This is my second note", body: "Blah blah blah"
},

];
const getAllNotes = (req, res) => {
    // res.send("Hello, This is my response to your request");
    res.json({
        notes: notes
    })
}
const getSpecificNote = (req, res) => {
    console.log(req.params);

    const note = notes.find(note => note.id == req.params.id);
    if (note == null) {
        return res.status(404);

    }
    res.json(note)
}
const updateNote = (req, res) => {

    const note = notes.find(note => note.id == req.params.id);
    if (note == null) {
        return res.status(404);
    }


    const {title, body} = req.body;

    const updatedNote = {
        ...note,
        title: title ?? note.title,
        body: body ?? note.body,

    }
    const index = notes.indexOf(note);
    notes[index] = updatedNote;


    res.json(updatedNote)
}
const deleteNote = (req, res) => {
    const noteIndex = notes.findIndex(n => n.id == req.params.id);
    if (noteIndex < 0) {

        return res.status(404);

    }
    notes.splice(noteIndex, 1);
    return res.json({
        success: true
    })
}

const createNewNote = (req, res) => {
    const {title, body} = req.body;
    const newNote = {
        id: notes[notes.length - 1].id + 1,
        title, body,
    };
    notes.push(newNote);
    res.json({
        note: newNote
    })
}
export {getAllNotes, getSpecificNote, deleteNote, createNewNote, updateNote}