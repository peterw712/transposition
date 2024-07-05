// Dictionary to map chord numbers to chord names
const chords = {
    1: "C", 2: "Db", 3: "D", 4: "Eb", 5: "E", 6: "F",
    7: "F#", 8: "G", 9: "Ab", 10: "A", 11: "Bb", 12: "B",
    "-1": "Cm", "-2": "Dbm", "-3": "Dm", "-4": "Ebm", "-5": "Em", 
    "-6": "Fm", "-7": "F#m", "-8": "Gm", "-9": "G#m", "-10": "Am",
    "-11": "Bbm", "-12": "Bm"
};

// Function to find the chord key from chord name
function findChordKey(chordName) {
    for (const [key, value] of Object.entries(chords)) {
        if (value === chordName) {
            return parseInt(key);
        }
    }
    return null;
}

// Function to transpose chords around a starting note
function transposeChords() {
    const startingNote = document.getElementById('starting-note').value;
    const startingKey = findChordKey(startingNote);
    
    if (startingKey === null) {
        alert("Invalid starting note");
        return;
    }
    
    const transposedChords = {};
    
    for (let key = 1; key <= 12; key++) {
        let newKey = (key + startingKey - 1) % 12;
        newKey = newKey === 0 ? 12 : newKey;
        transposedChords[key] = chords[newKey];
    }
    
    for (let key = -1; key >= -12; key--) {
        let newKey = (key + startingKey + 11) % 12 - 12;
        newKey = newKey === 0 ? -12 : newKey;
        transposedChords[key] = chords[newKey];
    }
    
    displayTransposedChords(transposedChords);
}

// Function to display transposed chords
function displayTransposedChords(transposedChords) {
    const chordList = document.getElementById('chord-list');
    chordList.innerHTML = '';

    for (const [key, chord] of Object.entries(transposedChords)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${key} = ${chord}`;
        chordList.appendChild(listItem);
    }
}
