const convertInput = require("./convertInput");

let midiParser  = require('C:\\Users\\Ryan\\Documents\\Git\\midi-parser-js');

//let tone = require(".\\node_modules\\tone");

let fs = require('fs')

// read a .mid binary (as base64)

function main(){
    var midiArray;

    fs.readFile('./Ending.mid', 'base64', function (err,data) {
        // Parse the obtainer base64 string ...
        midiArray = midiParser.parse(data);
        // done!
        console.log(midiArray);

        outputMIDI(midiArray);
    });
}

//console.log(midiArray);

function outputMIDI(midiArray){
    var finalNoteString = "";

    var note = ["c", "C", "d", "D", "e", "f", "F", "g", "G", "a", "A", "b"];
    
    //for(var i = 0; i < midiArray.track[0].event.length; i++){


    var trackToUse = midiArray.formatType;
    var channelToUse = 0;

    var melodyTrack = midiArray.track[trackToUse];
    var melodyDeltaTime = 0;
    var firstNote = true;

    // for(var i = 0; i < midiArray.track.length; i++){
    //    console.log(midiArray.track[i].event[1]);
    //}

    for(var i = 0; i < melodyTrack.event.length; i++){
        //console.log(midiArray.track[midiArray.formatType])
        var midiEvent = melodyTrack.event[i];
        
        console.log(midiEvent);

        //console.log(melodyDeltaTime);
        melodyDeltaTime += midiEvent.deltaTime;

        //console.log(note[noteNumber] + octaveNum + " | " + midiEvent.type + " | " + midiEvent.channel + " | " + midiEvent.data[1] + " | " + midiEvent.deltaTime * 1.0/(midiArray.timeDivision));

        if((midiEvent.type == 0x9) && ((melodyDeltaTime * 1.0/(midiArray.timeDivision) > 0.0) || firstNote) && midiEvent.channel == channelToUse){
            var noteNumber = midiEvent.data[0];
            //var originalNoteNum = midiEvent.data[0];

            var octaveNum = -2;
            while(noteNumber >= 12){
                octaveNum++;
                noteNumber -= 12;
            }

            console.log(note[noteNumber]);

            firstNote = false;
            finalNoteString += note[noteNumber];
        }
        
        if(midiEvent.channel == 0){
            melodyDeltaTime = 0;
        }
    }

    console.log(finalNoteString);
    console.log(finalNoteString.length);

    saveToFDC(convertInput(finalNoteString));
}

function saveToFDC(intervals){
    var stringOutput = "";
    for(var i = 0; i < intervals.length; i++){
        stringOutput += intervals[i] + " ";
    }

    stringOutput += "-1";

    fs.writeFile("songsPreHuman.fdc", stringOutput, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

main();