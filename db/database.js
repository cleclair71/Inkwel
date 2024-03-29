const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const readNotes = util.promisify(fs.readFile);
const writeNotes = util.promisify(fs.writeFile);

class saveData {
    read() {
        return readNotes('db/db.json', 'utf8');
    }
    write(note) {
        return writeNotes('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });

    }
    addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Note title and text cannot be blank');
        }
        const newNote = { title, text, id: uuidv4() };
        return this.getNotes().then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes)).then(() => newNote);
        // const updatedNotes = [...notes, newNote];
        // await this.write(updatedNotes);
        // return newNote;
    }
    removeNotes(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id)).then((filteredNotes) => this.write(filteredNotes));

        // const filteredNotes = notes.filter((note) => note.id !== id);
        // return this.write(filteredNotes);
    }
}

module.exports = new saveData();
