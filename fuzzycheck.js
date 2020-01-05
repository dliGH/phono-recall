var fs = require('fs');
const songMatchOutput = require('./songMatchOutput');
let Fuse = require("./node_modules/fuse.js");

/*function main(){
    //var closestSongs;
    readInFDC("./songs.fdc", "009335");
}*/

module.exports = function readInFDC(filepath, FDC, res){
    closestSongs = fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) throw err;
        //console.log(data);

        var lines = data.split("\r\n");

        //console.log(lines);

        FDCObjectList = createFDCObjectList(lines);

        /*
        for(var i = 0; i < FDCObjectList.length; i++){
            console.log(FDCObjectList[i]);
        }*/

        var closestSongs = getClosestSongs(FDCObjectList, FDCtoString(FDC));
        for(var i = 0; i < closestSongs.length; i++){
            console.log(closestSongs[i]);
        }

        //call in here
        songMatchOutput(closestSongs, res);
    });
}

function createFDCObjectList(lines){
    var FDCObjectList = [];
    var lineNum = 0;
    while(lines.length > lineNum){
        var FDCObject = new Object;
        
        FDCObject.songTitle = lines[lineNum];
        FDCObject.songString = FDCtoString(lines[lineNum + 1]);
        FDCObject.midiPath = lines[lineNum + 2];

        FDCObjectList.push(FDCObject);

        lineNum += 4;
    }

    return FDCObjectList;
}

function FDCtoString(FDC){
    var charCode = "0123456789AB";
    var intervalList = FDC.split(" ");
    var intervalNum = 0;
    var songString = "";
    while(intervalNum < intervalList.length){
        songString += charCode[parseInt(intervalList[intervalNum])];
        intervalNum++;
    }
    return songString;
}

function getClosestSongs(FDCObjectList, mainSongString){
    var options = {
        shouldSort: true,
        tokenize: true,
        findAllMatches: true,
        includeScore: true,
        threshold: 1.0,
        location: 0,
        distance: 100,
        maxPatternLength: 16,
        minMatchCharLength: 1,
        keys: [
          "songString"
        ]
    };
    var fuse = new Fuse(FDCObjectList, options);
    var result = fuse.search(mainSongString);
    return result;
}



//main();
//module.exports.fuzzycheck = fuzzycheck;
