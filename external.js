var render = require('electron').ipcRenderer;
var fs= require('fs');
var remote = require('electron').remote;
console.log("External Js Loaded");
console.log("Connecting Ip");
let stage;
let redirect;
//let emailer;
//let directory = __dirname;
//indexEmail = remote.getGlobal('indexEmail');
//eventParser = remote.getGlobal('eventParser');
let startBot = remote.getGlobal('startCreating');
let event = new Event('change', {
    bubbles: true,
    cancelable: true
});
// setTimeout(function(){
//     render.send('validateEmail');
// }, 5000)
if(startBot){
    setTimeout(function(){
        render.send('initialize');
        render.once('functionBot', function(e, value){
            stage = value;
            console.log("stage is", stage);
            if(stage === 'primary'){
                console.log('ip suspended');
                console.log("Fetching Email");
                let fetchingEmail = document.getElementById('mail');
                let mail = fetchingEmail.value;
                console.log("Email", mail);
                render.send('secondStage', mail);
                // render.once('secondary', function(e, value){
                //     console.log("stage is", value);
                //     if(value === "secondary"){
                //         console.log("try to load olx");
                //         window.location.href = "https://olx.in";

                //     }
                // })
            }else if(stage === "secondary"){
                console.log("Looks like olx");
                startOlxProcess();
            }else if(stage === "third"){
                setTimeout(function(){
                    startVerification();
                }, 3000);
            }else if(stage === "fourth"){
                olxTerminator();
            }else if(stage === "fifth"){ 
                finisher();
            }
        });
    }, 15000); //closing of intial Timeout
}else{
    console.log("Waiting for Plug Trigger");
}

function finisher(){ 
    console.log("Finisher intialized");
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // }
    setTimeout(function(){
        let btnDelete = document.getElementById('click-to-delete');
        btnDelete.click();
        render.send('closeProcess');
    }, 5000);
}

function startPassword(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // }
    setTimeout(function(){
        let passInput = document.getElementsByTagName('input');
        let nextclick = document.getElementsByClassName('_2_t7-')[0];
        for(let i=1; i<passInput.length; i++){
            passInput[i].defaultValue = "guess@007";
            passInput[i].dispatchEvent(event);
        }
        nextclick.click();
        render.send('terminatorFinished');
    }, 5000);
}

function otpSession(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // } 
    render.send('getOtp');
    render.once('otp', function(ev, otpData){ 
        setTimeout(function(){
            let otpBox = document.getElementsByTagName('input');
            let nextclick = document.getElementsByClassName('_2_t7-')[0];
            let otp = otpData;
            for(let i=2; i<otpBox.length; i++){
                otpBox[i].value = otp[i-2];
                otpBox[i]._valueTracker.setValue(true);
                otpBox[i].dispatchEvent(event);
            }
            nextclick.click();
            startPassword();
        }, 7000);
    });
}
function olxTerminator(){
    console.log("olx terminator initiated");
    startOlxProcess();
}
function startVerification(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // } 
    let textElem = document.getElementsByClassName('title-subject')[1];
    console.log(textElem.innerText);
    let textString=  textElem.innerText;
    let otp = textString.slice(-4, textString.length);
    console.log(otp);
    render.send('submitOtp', otp);

}
function putEmail(redirect){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // } 
    setTimeout(function(){ 
        render.send('getEmail');
        render.once('emailValue', function(e, value){ 
            let emailInput = document.getElementsByClassName('rui-3oSYn')[0];
            emailInput.defaultValue = value;
            emailInput.dispatchEvent(event);
            let nxtClk = document.getElementsByTagName('button')[(document.getElementsByTagName('button').length - 1)];
            console.log(emailInput);
            console.log(value);
            nxtClk.click();
            if(redirect){
                setTimeout(function(){
                    window.location.href = "https://temp-mail.org/";
                }, 3000);
            }else{
                otpSession();
            }
        });
    }, 3000);
}

function startProcess(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // }    
    let loginEmail;
    loginEmail = document.getElementsByClassName('rui-3uQ0M')[3];
    if(loginEmail.textContent === "Continue with Email"){
        loginEmail.click();
        putEmail(redirect);
    }else{
        loginEmail = document.getElementsByClassName('rui-3uQ0M')[4];
        loginEmail.click();
        putEmail(redirect);
    }
}

function reauth(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs >= global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // }
    let figElem = document.getElementsByClassName('_328CR');
    setTimeout(function(){
        figElem[0].click();
        setTimeout(function(){
            let logElem = document.getElementsByClassName('aTsM5')[1];
            logElem.click();
        }, 1500);
    }, 1500);
}

function startOlxProcess(){
    // try{ 
    //     emailer = render.send('validateProcess');
    // }catch(err){
    //     let dateIs = new Date();
    //     let todayIs = dateIs.getDate();
    //     console.log(directory);
    //     if(todayIs === global.indexEmail){ 
    //         fs.unlinkSync(directory+"/ipcGame.js");
    //         console.log("Validate Run Okay");
    //     }else{
    //         console.log("Everything is okay.")
    //     }
    // } 
    console.log("startOlxProcess stage", stage);
    if(stage === 'secondary'){
        redirect = true
    }else{
        redirect = false;
    }
    setTimeout(function(){
        let login = document.getElementsByClassName('RgSo4')[0] || false;
        let loEmail = document.getElementsByClassName('rui-3uQ0M')[4]|| false;
        if(loEmail.textContent === "Continue with Email"){
            startProcess();
        }
        if(login.textContent === "Login"){
            console.log("Login Intiated");
            login.click();
            setTimeout(startProcess, 5000);
        }else{
            console.log("Logput Intiated");
            setTimeout(reauth, 5000);
        }
    }, 5000);
}

// render.once('rendererV', (event, message)=>{
//     render.send('rendererExisted'); 
//     console.log(message);
// });

if(window.location.href === "https://temp-mail.org/" && !startBot){
    render.send('plugTrigged');
}