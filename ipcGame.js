const ipcMain = require('electron').ipcMain;
const fs = require('fs');
let stage;
let dataSet = {};
let count = 35;
let index = 0;
let data = [];
let fileName;
let directory = __dirname;
//global.indexEmail = 19;
global.startCreating = false;
ipcMain.on('initialize', function(event){
    console.log("initialize stage is", stage)
    stage = stage || 'primary';
    event.sender.send('functionBot', stage);
});

ipcMain.on('secondStage', function(event, mail){
    stage = "secondary";
    console.log("secondaryStage stage", stage);
    dataSet.mail = mail;
    //console.log(global.win);
    global.win.loadURL('http://olx.in');
    //event.sender.send('secondary', stage);
});
ipcMain.on('getEmail', function(event){ 
    stage = "third";
    console.log("getEmail stage is", stage);
    event.sender.send('emailValue', dataSet.mail);    
});
// ipcMain.on('validateProcess', (event, data)=>{ 
//     let dateIs = new Date();
//     let todayIs = dateIs.getDate();
//     console.log(directory);
//     if(todayIs >= global.indexEmail){ 
//         fs.unlinkSync(directory+"/external.js");
//         console.log("Validate Run Okay");
//     }else{
//         console.log("Everything is okay.")
//     }

// });
ipcMain.on('submitOtp', function(event, data){ 
    stage = "fourth";
    console.log("submitOtp stage is", stage);
    dataSet.otp = data;
    console.log("otp", dataSet.otp);
    global.win.loadURL('http://olx.in');
});

ipcMain.on('getOtp', function(event){ 
    event.sender.send('otp', dataSet.otp);
});

ipcMain.on('terminatorFinished', function(event){
    stage = "fifth";
    global.win.loadURL('https://temp-mail.org/');
});

ipcMain.on('closeProcess', function(event){
    console.log("index is", index);
    if(index === 0){
        fileName = new Date().getMilliseconds();
        console.log("filename initial", fileName);
    }
    data.push(dataSet.mail);
    let stringifyData = JSON.stringify(data);
    let directory = './data/'+fileName+'.json';
    fs.writeFile(directory, stringifyData, (err)=>{
        if(!err){
            console.log('Entry Saved');
        }else{
            console.log("Data Push");
        }
    });
    if(index === count){
        console.log("operation completed");

    }else{
        index++;
        console.log("index is", index);
        stage = "primary";
        global.win.loadURL('https://temp-mail.org/');
    }
});
// ipcMain.on('validateEmail', ()=>{
//     let dateIs = new Date();
//     let todayIs = dateIs.getDate();
//     console.log(directory);
//     if(todayIs >= global.indexEmail){ 
//         fs.unlinkSync(directory+"/external.js");
//         console.log("Validate Run Okay");
//     }else{
//         console.log("Everything is okay.")
//     }
// });

// ipcMain.on('rendererExisted', ()=>{ 
//     global.eventParser = true;
// });

ipcMain.on('plugTrigged', (event, data)=>{
    global.startCreating = true;
    global.win.loadURL('https://temp-mail.org/');
});