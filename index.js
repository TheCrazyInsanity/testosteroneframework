var http = require('http'); // Import Node.js core module
const fs = require('fs')
const url = require('url');
var server = http.createServer(function (req, res) {   //create web server
console.log(req.url)
console.log(url.parse(req.url, true).query)
console.log(url.parse(req.url, true))
forg = req.url
if(forg == "/"){
    forg = ""
}
try{
if (!(url.parse(forg, true).pathname == undefined)){
res.end(require(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.js`).exportshit(url.parse(req.url, true).query))
}else{
res.end(require(`${__dirname}/servershit/index.js`).exportshit(url.parse(req.url, true).query))    
}
var resolve = require('resolve');

var path = null
if (!(url.parse(forg, true).pathname == undefined)){
    path = resolve.sync(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.js`);
}else{
    path = resolve.sync(`${__dirname}/servershit/index.js`);  
}

console.log("Path to module found:", path);

if (require.cache[path]){
    delete require.cache[path];
}
} catch(e){
    console.log("Somebody went to a wrong page, or maybe they fucking broke something lmfao")
    console.log(e)
    res.end(`Error, if you are sure this page is real please send me the following error code:
    ${e}`)
}
});

server.listen(8080); //6 - listen for any incoming requests

console.log('Node.js web server at port 8080 is running..')

