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
    async getNotes() {
        const notes = await this.read();
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    }
    async addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
        throw new Error('Note title and text cannot be blank');
        }
        const newNote = { title, text, id: uuidv4() };
        const notes = await this.getNotes();
        const updatedNotes = [...notes, newNote];
        await this.write(updatedNotes);
        return newNote;
    }
    async removeNotes(id) {
        const notes = await this.getNotes();
        const filteredNotes = notes.filter((note) => note.id !== id);
        return await this.write(filteredNotes);
    }
}

module.exports = new saveData();