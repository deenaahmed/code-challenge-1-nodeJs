#! /usr/bin/node
var http = require('http')
var key = process.argv[3]; 
var value = process.argv[4]; 
var functionvar = process.argv[2];
const fs = require('fs');

http.createServer(function(request, response){
response.writeHead(200, {"Content-Type": "text/plain"})
response.end("Hello World\n")
}).listen(process.env.PORT)

function add(keyval,valueval) {
    let writeStream = fs.createWriteStream('secret.txt',{ 'flags': 'a'});
    writeStream.write(keyval + ':' + valueval + ',');
    writeStream.on('finish', () => {});
    writeStream.end(); 
}

function list() {
    var array = fs.readFileSync('secret.txt').toString().split(",");
    for(i in array) {
        console.log(array[i]);
    }
}

function clear() {
    let writeStream = fs.createWriteStream('secret.txt',{ 'flags': 'w'});
    writeStream.write("");
    writeStream.on('finish', () => {});
    writeStream.end(); 
}

function remove(keyvalue) {
    var array = fs.readFileSync('secret.txt').toString().split(",");
    clear();
    for(i in array) {
        var arr = array[i].split(":");
        if(arr[0]!=keyvalue && arr[1]!=undefined){
            add(arr[0],arr[1]);
        }
    }
}

function get() {
    var array = fs.readFileSync('secret.txt').toString().split(",");
    for(i in array) {
        var array2 = array[i].split(":");
        if(array2[0]==key){
           console.log(array[i]); 
        }
    }
}



if(functionvar=="add"){
add(key,value);
}
else if(functionvar=="list"){
list();
}
else if(functionvar=="clear"){
clear();
}
else if(functionvar=="remove"){
remove(key);
}
else if(functionvar=="get"){
get();
}






