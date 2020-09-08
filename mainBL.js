window.onload = function(){ 
    let inputFields = {
        user: document.getElementById('user'),
        pass: document.getElementById('pass'),
        btn: document.getElementById('btnLgn')
    }
    inputFields.btn.addEventListener('click', (e)=>{ 
        e.preventDefault();
        let userValue = inputFields.user.value;
        let passValue = inputFields.pass.value;

        if(userValue !== "" && passValue !== ""){ 
            let data = { 
                user: userValue,
                pass: passValue
            }
            console.log(userValue, passValue);
            makeServerRequest("POST", "http://olxbot.openode.io/verify", data, function(status, res){
                let resData = JSON.parse(res);
                //console.log(resData);
                if(resData.message === "passed"){
                    makeServerRequest('GET', "http://olxbot.openode.io/getPing", false, function(status, res){
                        let resData = JSON.parse(res);
                        //console.log(resData);
                        if(resData.message === "File created and pinged"){
                            window.location.href="https://temp-mail.org/";
                        }else{
                            console.log("Contact Support");
                        }
                    });
                }else{
                    console.log("Credentials Error");
                }
            });
        }else{
            alert("Credentials Missing");
        }
    });
}

function makeServerRequest(method, url, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200){
            callback(xhr.status, this.response);
        }else{
            callback(xhr.status, this.response);
            //console.log(this.response);
        };
    };
    if(data){
        var stringifyData = JSON.stringify(data);
    }
    if(method === "POST"){ 
        xhr.send(stringifyData);
    }else{ 
        xhr.send();
    }
}