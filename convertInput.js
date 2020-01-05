
module.exports = function convertInput(stringInput){


    var noteInput = stringInput.split('');
    var noteValue = [];

			for(var i = 0; i <= noteInput.length; i++)
			{
				switch (noteInput[i])
				{
					case "c":
						noteValue.push(0);
						break;
					case "C":
						noteValue.push(1);
						break;
					case "d":
						noteValue.push(2);
						break;
					case "D":
						noteValue.push(3);
						break;
					case "e":
						noteValue.push(4);
						break;
					case "f":
						noteValue.push(5);
						break;
					case "F":
						noteValue.push(6);
						break;
					case "g":
						noteValue.push(7);
						break;
					case "G":
						noteValue.push(8);
						break;
					case "a":
						noteValue.push(9);
						break;
					case "A":
						noteValue.push(10);
						break;
					case "b":
						noteValue.push(11);
						break;
				}
			}

            //checking
            console.log('noteInput array: ' + noteInput);
            console.log('noteValue array: ' + noteValue);

			// Making another array to hold the space between the notes
			var noteSpace = [];

			for(var i = 1; i < noteValue.length; i++){
                	noteSpace.push(noteValue[i] - noteValue[i-1]);
            }
			
			//this for loop basically does the octave jump thing because octaves don't matter
			for(var i = 0; i < noteSpace.length; i++)
			{
				if(noteSpace[i] < 0)
					noteSpace[i] += 12;
            }

             //checking
            //console.log('noteSpace array: ' + noteSpace);

            return noteSpace;
}