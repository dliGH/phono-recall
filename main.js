//using express so easier now

//including modules
var express = require("express");
var path = require("path");
const convertInput = require('./convertInput');
const fs = require('fs');
const readInFDC = require('./fuzzycheck');

const app = express();
const port = 3000;

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/myform', function(req, res){ 

    //console.log(req.query.noteInput);
    myNoteInput = req.query.noteInput;
    
    //convert to useable function
   
    var convertedInput = convertInput(myNoteInput);
   
    //checking ... WORKS OH YEAHHHH
    console.log(convertedInput);
    
    //reading in MIDI or finding melody of instrument		
	    //will start with 8bit type music
        //converting midi to useable format
            //this is going to work totally as a script oh yeahhhhh
    //JK WE DID THIS OFFSITE WITH OTHER PROTAM AKA APP.JS

    //compare useable formats
        //some algorithim with fugdhe stuff
    
    var concatenatedInput = '';
    for(i = 0; i < convertedInput.length - 1; i++){
        concatenatedInput += convertedInput[i];
        concatenatedInput += ' ';
    }
    concatenatedInput += convertedInput[convertedInput.length-1];

    readInFDC('./songs.fdc',concatenatedInput,res);

    //return list of tracks in order of match percentage and midi files to listen
        //generate new html file with playable midi files at the end.
        //does everything above in readInFDC^^

        //where converted input is rn needs to be some text file with the specific html code that we want to generate a new page on.

    //after that page is generated we can send the user to that page through the browser

    //after that just create a back button with a go form on html that brings it back to the original server
    
    //stonks

    //send them to that file and create a seperate get function again for going backwards

    //for now do this just to make sure that it doesn't infinitley load
    //res.sendFile(path.join(__dirname+'/index.html'));

}); 


app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
  })
