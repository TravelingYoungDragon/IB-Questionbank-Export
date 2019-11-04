var fs = require('fs');

var output = ['HL-paper1.pdf' ,'HL-paper2.pdf' ,'HL-paper3.pdf' ,'markscheme-HL-paper1.pdf' ,'markscheme-HL-paper2.pdf' ,'markscheme-HL-paper3.pdf' ,'markscheme-SL-paper1.pdf' ,'markscheme-SL-paper2.pdf' ,'markscheme-SL-paper3.pdf' ,'SL-paper1.pdf' ,'SL-paper2.pdf','SL-paper3.pdf'];

//var folders = ["Option A","Option B","Option C","Option D","Topic 1","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7","Topic 8","Topic 9","Topic 10","Topic 11"];
//var folders = ["Topic 1","Topic 2","Topic 3","Topic 4","Topic 5","Topic 6","Topic 7"];
//var folders = ["Changing space—the shrinking world","Disparities in wealth and development","Economic interactions and flows","Environmental change","Global interactions at the local level","Measuring global interactions","Option A","Option B","Option C","Option D","Option E","Option F","Option G","Patterns in environmental quality and sustainability","Patterns in resource consumption","Political outcomes","Populations in transition","Sociocultural exchanges"];

var folders = ['Option A','Option B','Option C','Option D','Topic 1','Topic 2','Topic 3','Topic 4','Topic 5','Topic 6','Topic 7','Topic 8','Topic 9','Topic 10','Topic 11','Topic 12','Topic 13','Topic 14','Topic 15','Topic 16','Topic 17','Topic 18','Topic 19','Topic 20','Topic 21']

for (let i = 0; i < folders.length; i++) {
    fs.mkdirSync('./IB_QB_Results/' + folders[i]);
}


var count = 300;

var folderIndex = 0;
var counter = 1;

(async () => {
    for (let i = 1; i <= count; i++) {
        fs.renameSync('./IB_QB_Results/Paper-' + i + '.pdf' , './IB_QB_Results/'+folders[folderIndex]+'/'+output[counter-1]);
        if (counter == 12) {
            counter = 1;
            folderIndex++;
        } else {
            counter++;
        }
    }
})();