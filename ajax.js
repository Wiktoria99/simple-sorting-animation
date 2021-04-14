function getHTTPObject() {
    var xhr = false;
    if (window.XMLHttpRequest)   { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
            try { xhr = new XMLHttpRequest();
            }
            catch(e) {
            try { xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) { xhr = false;
            }
            }
        }
    return xhr;
}

function read(url) {
      req = getHTTPObject();
      if (req) {
         req.onreadystatechange=onResponse; 
         req.open("GET", url, true); 
         req.send(null); 
      }    
}

function onResponse() {
    if (req.readyState==4) { 
        if (req.status==200) { 
            document.getElementById("toRead").innerHTML = req.responseText;          
        }
        else { 
            document.getElementById("toRead").innerHTML = 'error :(';   
        } 
    }  
}  
