let ok=true;
function getXMLHttpRequestObject() {
    let request = null;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try { request = new ActiveXObject("Msxml2.XMLHTTP") }
        catch (e) {
            try { request = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e1) {}
        }
    }
    return request;
}

function checkText(check) {
    console.log("start");
    const xhr=getXMLHttpRequestObject();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                if (this.responseText != null) {
                    console.log("ok");
                    let data = JSON.parse(this.responseText);
                    document.getElementById("1").innerHTML=data[0].status==="ko"?" invalid username":"valid username";
                    ok=data[0].status==="ko";
                }else
                    alert("error");
            }else
                alert("Ajax error: " + xhr.status);
        }
    };
    const url = encodeURI("https://saw1718.herokuapp.com/validation.php?username="+check);
    xhr.open("GET", url, true);
    xhr.send();
}

function check() {
    if (ok)
        alert("invalid username");
}