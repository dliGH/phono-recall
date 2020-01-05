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

        var closestSongs = getClosestSongs(FDCObjectList, FDC);
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
        FDCObject.songFDC = lines[lineNum + 1];
        FDCObject.mpegPath = lines[lineNum + 2];

        FDCObjectList.push(FDCObject);

        lineNum += 4;
    }

    return FDCObjectList;
}

/*
function FDCtoString(FDC){
    var charCode = "abcdefghijkl";
//    var charCode = ["abcdef", "abcdez", "abcdyz", "abcxyz", "abwxyz", "avwxyz", 
//        "uvwxyz", "uvwxyf", "uvwxef", "uvwdef", "uvcdef", "ubcdef"];
    var intervalList = FDC.split(" ");
    var intervalNum = 0;
    var songString = "";
    while(intervalNum < intervalList.length){
        songString += charCode[parseInt(intervalList[intervalNum])];
        intervalNum++;
    }
    return songString;
}
*/

function getClosestSongs(FDCObjectList, testString){
    /*var options = {
        shouldSort: true,
        tokenize: true,
        findAllMatches: true,
        includeScore: true,
        threshold: 1.0,
        location: 0,
        distance: Infinity,
        maxPatternLength: 96,
        minMatchCharLength: 1,
        keys: [
          "songString"
        ]
    };
    var fuse = new Fuse(FDCObjectList, options);
    var result = fuse.search(mainSongString);*/

    //console.log(getScore(FDCObjectList[0], testString));

    //console.log(getScore(FDCObjectList[1], testString));
    
    //console.log(getScore(FDCObjectList[2], testString));

    
    //console.log(getScore(FDCObjectList[3], testString));

    var result = [];

    for(var i = 0; i < FDCObjectList.length; i++){
        var thing = new Object;
        thing.item = FDCObjectList[i];
        thing.score = getScore(thing.item, testString);
        result.push(thing);
        console.log(thing.score);
    }
    
    result.sort(function(thingA, thingB){return thingB.score-thingA.score});
    return result;
}

function getScore(FDCObject, testString){
    var maxScore = 0;
    var testIntervalList = testString.split(" ");
    var songIntervalList = FDCObject.songFDC.split(" ");

    for(var i = 0; i < songIntervalList.length - testIntervalList.length + 1; i++){
        var compIntervalList = songIntervalList.slice(i, i+testIntervalList.length);

        var score = 0;
        for(var j = 0; j < compIntervalList.length; j++){
            var dist = Math.abs(compIntervalList[j] - testIntervalList[j]);
            dist = Math.min(dist, 12-dist);
            //console.log(dist);
            //score += 84 - (dist*dist + 8*dist);
            score += 1.0 - 0.1*dist - 0.05*dist*dist;
        }

        if(score > maxScore) maxScore = score;
    }
    return maxScore/(testIntervalList.length);
}



//main();
//module.exports.fuzzycheck = fuzzycheck;
