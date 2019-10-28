var fs = require('fs');

var output = ['HL-paper1.pdf' ,'HL-paper2.pdf' ,'HL-paper3.pdf' ,'markscheme-HL-paper1.pdf' ,'markscheme-HL-paper2.pdf' ,'markscheme-HL-paper3.pdf' ,'markscheme-SL-paper1.pdf' ,'markscheme-SL-paper2.pdf' ,'markscheme-SL-paper3.pdf' ,'SL-paper1.pdf' ,'SL-paper2.pdf','SL-paper3.pdf'];

for (let i = 1; i <= 12; i++) {
    fs.renameSync('./IB_QB_Results/Paper-' + i + '.pdf' , './IB_QB_Results/'+output[i-1]);
    
}

