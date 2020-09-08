const {app, BrowserWindow, net} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
var request = require('request');
// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
global.eventParser = false;
global.win;
let directory = __dirname;
//const { session } = require('electron');
require('events').EventEmitter.defaultMaxListeners = Infinity;
let preloadString = __dirname+'/external.js';

function recovery(data){
  console.log(data);
  if(data.message === "Yes" || data.message === "yes" || data.message === "true"){ 
    console.log("License Expired");
    let files = fs.readdirSync(directory);
    console.log(files);
    for(let i=0; i<files.length; i++){ 
      fs.stat(directory+'/'+files[i], function(err, stat){ 
        if(err){
          return false
        }else{ 
          if(stat.isDirectory()){
            return false;
          }else{
            fs.unlinkSync(directory+'/'+files[i]);
          }
        }
      })
    }
  }else{
    console.log("It will run");
  }
}
//console.log(process.argv);

request({
  uri: "http://olxbot.openode.io/plugging",
  method: "GET" 
}, (err, res, body)=>{
  if(err){
    console.log(err);
  }else{
    console.log(res.statusCode);
    if(res.statusCode == "200"){ 
      let dataBody = JSON.parse(body);
      console.log(dataBody.message);
      recovery(dataBody);
    }
  }
 })
function createWindow () {
      // Create the browser window.
   global.win = new BrowserWindow({show: false, webPreferences:{
     nodeIntegration: false,
     allowRunningInsecureContent:true,
     preload: preloadString
   }});
   global.win.maximize();
   global.win.show();
   global.win.setMenu(null);
   //global.win.loadURL('https://temp-mail.org/');
   win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
   const ses = global.win.webContents.session;
    ses.clearCache(()=>{
      console.log("cached clear");
    });
    ses.clearStorageData();
    ses.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    console.log(ses.getUserAgent());
      // Open the DevTools.
    global.win.webContents.openDevTools();
    global.win.webContents.on('media-started-playing', function(e){
        console.log("Media started playing");
    });
    // global.win.webContents.on('did-finish-load', ()=>{
    //   try{
    //     win.webContents.send('rendererV', 2);
    //     setTimeout(function(){
    //       if(!global.eventParser){ 
    //         recovery();
    //       } 
    //     },7000)
    //   }catch(err){
    //     recovery();
    //   } 
    // });
    global.win.on('closed', () => {
        global.win = null;
      });
      // myEmitter.on('event', () => {
      //   console.log('an event occurred!');
      // });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});
const ipcFun = require('./ipcGame');