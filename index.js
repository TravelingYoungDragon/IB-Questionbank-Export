const scrape = require('website-scraper');
const getHrefs = require('get-hrefs');
const lineReader = require('line-reader');
var fs = require('fs');
var unique = require('array-unique').immutable;

var readlineSync = require('readline-sync');
  
console.log('What do you want to do?');

// Wait for user's response.
var action = readlineSync.question('Download: 1 | Convert: 2  => ');
if (action == 1) {
    console.log("Downloading...");
    downloadBank();
} else if (action == 2) {
    var delimiter = readlineSync.question('Marksceme: 1 | No Marksceme: 2  => ');
    if (delimiter == 2) {
        var endDelimiter = '<h2 style="margin-top: 1em">Markscheme</h2>';
        var outputFile = './download/';
    } else if (delimiter == 1) {
        var endDelimiter = '<h2>Syllabus sections</h2>';
        var outputFile = './download/markSceme-';
    } else {
        console.log("You did not enter a valid input...");
        process.exit(1);
    }
    var fileNumber = readlineSync.question('How many pages to convert?  => ');
    if (fileNumber < 1000) {
        console.log("Converting " + fileNumber + " pages...");
        
        runSeperateQuestions(fileNumber);
} else {
    console.log("That number was too big...");
}
} else {
    console.log("You did not enter a valid input...");
}


function downloadBank() {
    var urls = getHrefs(fs.readFileSync('IBQ.htm', 'utf8'));
    var uniqueUrls = unique(urls);
    
    const options = {
      urls: uniqueUrls,
      directory: './download',
    };
     
    // with async/await
    scrape(options).then((result) => {

    });
}

async function runSeperateQuestions(fileNumber) {


    var head = fs.readFileSync('./head.html', 'utf8');

    fs.writeFileSync(outputFile + 'SL-paper1.html', head + '<h2>SL Paper 1</h2>');
    fs.writeFileSync(outputFile + 'SL-paper2.html', head + '<h2>SL Paper 2</h2>');
    fs.writeFileSync(outputFile + 'SL-paper3.html', head + '<h2>SL Paper 3</h2>');
    fs.writeFileSync(outputFile + 'HL-paper1.html', head + '<h2>HL Paper 1</h2>');
    fs.writeFileSync(outputFile + 'HL-paper2.html', head + '<h2>HL Paper 2</h2>');
    fs.writeFileSync(outputFile + 'HL-paper3.html', head + '<h2>HL Paper 3</h2>');      

    await getQuestion('./download/index.html');
    for (let i = 1; i <= fileNumber; i++) {
        console.log("Parsing index_"+i+".html");
        
        await getQuestion('./download/index_'+i+'.html');
    }
    console.log(previousCodes);
    
}
var previousCodes = [];
function getQuestion(file) {
    var paper = 1;
    var level = 'sl';
    var reading = false;
    var code = false;
    var done = false;
    return new Promise((resolve, reject) => {
    lineReader.eachLine(file, function(line, last, cb) {
        if (done == true) {
            cb(false);
        } else {
            cb();
        }
        if (line.includes(endDelimiter)) {
            reading = false;
            if (level == 'sl') {
                if (paper == 1) {
                    fs.appendFileSync(outputFile + 'SL-paper1.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                    
                }
                if (paper == 2) {
                    fs.appendFileSync(outputFile + 'SL-paper2.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                }
                if (paper == 3) {
                    fs.appendFileSync(outputFile + 'SL-paper3.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                }
            } else if (level == 'hl') {
                if (paper == 1) {
                    fs.appendFileSync(outputFile + 'HL-paper1.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                }
                if (paper == 2) {
                    fs.appendFileSync(outputFile + 'HL-paper2.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                }
                if (paper == 3) {
                    fs.appendFileSync(outputFile + 'HL-paper3.html', "<br><hr><br>");
                    console.log("Writing Finished.");
                }
            }
            done = true;
        }
        if (reading == true) {
            if (level == 'hl') {
                if (paper == 1) {
                    fs.appendFileSync(outputFile + 'HL-paper1.html', line + '\r\n');
                }
                if (paper == 2) {
                    fs.appendFileSync(outputFile + 'HL-paper2.html', line + '\r\n');
                }
                if (paper == 3) {
                    fs.appendFileSync(outputFile + 'HL-paper3.html', line + '\r\n');
                }
            } else if (level == 'sl') {
                if (paper == 1) {
                    fs.appendFileSync(outputFile + 'SL-paper1.html', line + '\r\n');
                }
                if (paper == 2) {
                    fs.appendFileSync(outputFile + 'SL-paper2.html', line + '\r\n');
                }
                if (paper == 3) {
                    fs.appendFileSync(outputFile + 'SL-paper3.html', line + '\r\n');
                }   
            }
        }
        if (code == true) {
            console.log(previousCodes.indexOf(line));
            
            if (previousCodes.indexOf(line) == -1) {
                previousCodes.push(line);
            } else {
                console.log("Repeat!");
                code = false;
                done = true;
            }
            code = false;
        }
        if (line.includes('Paper 1')) {
            paper = 1;
        } else if (line.includes('Paper 2')) {
            paper = 2;
        } else if (line.includes('Paper 3')) {
            paper = 3;
        }
        if (line.includes('Higher level')) {
            level = 'hl';
        } else if (line.includes('Standard level')) {
            level = 'sl';
        }
        if (line.includes('<h2>Question</h2>')) {
            reading = true;
            console.log("Writing...");
        }
        if (line.includes('<td class="info_label">Reference code</td>')) {
            code = true;
        }
    }, function finished (err) {
        if (err) return reject(err);
        resolve();
        console.log("Finished question!");
        return true;
      });
    });
}
