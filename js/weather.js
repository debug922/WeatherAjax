/*
            se vuoi aggiungere le icone del meteo prima si devono scaricare le immagini da qui:
            https://openweathermap.org/weather-conditions
`           perche il server  di openweather che mi invia il meteo nell'array json, ha un campo icon.
            icon e' un codice che corrisponde alle immaggini presenti nel sito linkato
             */


function london() {
    weather("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bb89f5fd7ee0e0da089bf5684bcbb270");
}
function newYork() {
    weather("http://api.openweathermap.org/data/2.5/weather?q=new york,usa&appid=bb89f5fd7ee0e0da089bf5684bcbb270");
}

function clock(ora) {
    let data= new Date(0);
    data.setUTCSeconds(ora);
    let hh=data.getUTCHours();
    let mm=data.getUTCMinutes();
    let ss=data.getUTCSeconds();
    if (hh < 10)
        hh = "0"+hh;
    if (mm < 10)
        mm = "0"+mm;
    if (ss < 10)
        ss = "0"+ss;

    return hh+":"+mm+":"+ss;
}
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
function weather(city) {
    function showData(dato){
        let out="now in "+(dato.hasOwnProperty("name")?dato.name:" ")+"\r\n ";
        for (let i in dato ){
            if(i==="weather" && dato.hasOwnProperty(i)) {
                out+="weather: ";
                for (let j in dato[i]) {
                    out+=dato[i][j].description+" ";
                    console.log(dato[i][j].main + " " + i + " "+j);
                }
                out+="\r\n"
            }
            if (i==="main" && dato.hasOwnProperty(i)){
                if (dato[i].hasOwnProperty("temp")){
                    out+=" temp: "+Math.round(parseFloat(dato[i]["temp"])-273.15)+"C \r\n";
                    console.log(dato[i]["temp"] + " " + i);
                }
            }
            if (i==="sys" && dato.hasOwnProperty(i)){
                if (dato[i].hasOwnProperty("sunrise")){
                    out+=" sunrise in UTC: "+clock(parseInt(dato[i]["sunrise"]))+" \r\n";
                    console.log(parseInt(dato[i]["sunrise"]) + " " + i);
                }
                if (dato[i].hasOwnProperty("sunset")){
                    out+=" sunset in UTC: "+clock(parseInt(dato[i]["sunset"]))+" \r\n";
                    console.log(dato[i]["sunset"] + " " + i);
                }
            }
        }
        console.log(out);
        return out;
    }
    console.log("fuck");
    const xhr=getXMLHttpRequestObject();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                if (this.responseText != null) {
                    console.log("ok");
                    alert(showData(JSON.parse(this.responseText)));
                }else
                    alert("error");
            }else
                alert("Ajax error: " + xhr.status);
        }
    };
    xhr.open("GET",encodeURI(city), true);
    xhr.send();
}
