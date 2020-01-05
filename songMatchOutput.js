var fs = require('fs');
var express = require("express");
var path = require("path");


//generate html file from here --> import function back up for object list
module.exports = function songMatchOutput(FDCObjectList, res){    
    
    //write to songMatch txt

    var top = fs.readFileSync('songHTMLtop.txt');
    var middle = '';
    for(var i = 0; i < FDCObjectList.length; i++){
        var num = i+1;

        //song name
        middle += '<div align="center">\n';
        middle += '<h1> #' + num + ': ' + FDCObjectList[i].item.songTitle +  ' </h1>\n';
        middle += '</div>\n';
        //somehow have a playable midi
        //maybe need mp3... not really working yet.
            //trying
        middle += '<div align="center">\n';
        middle += '<audio src="' + FDCObjectList[i].item.mpegPath + '" controls>'
        + '\nError: your web browser does not support this audio player.'
        + '</audio>';
        
        /*
        '<audio controls="controls">'
          +  '<source src="' + FDCObjectList[i].item.mpegPath + '" type="audio/mpeg">'
          +  '</audio>';
        middle += '</div>\n';*/
        
        //calculate percentage
        var percentMatch = (FDCObjectList[i].score)*100;
        //rounding
        percentMatch = Math.round(percentMatch).toFixed(1);
        //output percentage
        middle += '<div align="center">\n';
        middle += '<h1> ' + percentMatch +  '% Match </h1>\n';
        middle += '</div>\n';

        //add back form button to go back to first index
        //then make a new get method in main
        //^^maybe don't need this

    }    
    var bottom = fs.readFileSync('songHTMLbottom.txt')

    var songOutput = top + middle + bottom;

    fs.writeFileSync("songMatch.html", songOutput);

    res.sendFile(path.join(__dirname+'/songMatch.html'));
}