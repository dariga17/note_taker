const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data)

        res.json(notes)
    })
})

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;

        newNote.id = Math.floor(Math.random() *100000000)

        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if(err) throw err;
            res.json("Added a new note")
        })
    })
})

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("Hello I am alive")
})