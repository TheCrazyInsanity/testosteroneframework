var http = require('http'); // Import Node.js core module
var PHPFPM = require("node-phpfpm");
const fs = require('fs')
const url = require('url');

var phpfpm = new PHPFPM({
    host: '127.0.0.1',
    port: 6942,
    documentRoot: `${__dirname}/servershit`
});

var server = http.createServer((req, res) => {   //create web server
    //var retarded = true
    console.log(req.url)
    var method = req.method
    console.log(url.parse(req.url, true).query)
    console.log(url.parse(req.url, true))
    forg = req.url
    if (forg == "/") {
        forg = ""
    }
    try {
        var retarded = false
        console.log("sped ass shit")
        console.log(`${__dirname}/servershit${url.parse(forg, true).pathname}index.js`)
        if ((fs.existsSync(`${__dirname}/servershit${url.parse(forg, true).pathname}`)) && (fs.existsSync(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.php`))) { // Execute PHP shit
            console.log("is php")
            phpfpm.run(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.php`, (err, output, php_errors) => {
                if (err == 99) {
                    throw(`Internal php fpm error: ${err}`);
                }
                res.end(output);
                if (php_errors) {
                    console.log(`PHP Has encountered errors:\n${php_errors}`);
                }
            });
        } else if ((fs.existsSync(`${__dirname}/servershit${url.parse(forg, true).pathname}`)) && !(fs.existsSync(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.js`))) {
            console.log("is file request")
            res.end(fs.readFileSync(`${__dirname}/servershit${url.parse(forg, true).pathname}`))
            retarded = true
        } else { // Execute regular js shit
            console.log("is js")
            if (retarded == false) {
                if (!(url.parse(forg, true).pathname == undefined)) {
                    res.end(require(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.js`).exportshit(url.parse(forg, true).pathname, url.parse(req.url, true).query))
                } else {
                    res.end(require(`${__dirname}/servershit/index.js`).exportshit(url.parse(forg, true).pathname, url.parse(req.url, true).query))
                }
                var resolve = require('resolve');
            }

            var path = null
            if (retarded == false) {
                if (!(url.parse(forg, true).pathname == undefined)) {
                    path = resolve.sync(`${__dirname}/servershit${url.parse(forg, true).pathname}/index.js`);
                } else {
                    path = resolve.sync(`${__dirname}/servershit/index.js`);
                }

                console.log("Path to module found:", path);

                if (require.cache[path]) {
                    delete require.cache[path];
                }
            } else {
                retarded = false
            }
        }
    } catch (e) {
        console.log("Somebody went to a wrong page, or maybe they fucking broke something lmfao")
        console.log(JSON.stringify(e))
        if (JSON.stringify(e).includes('MODULE_NOT_FOUND')) {
            res.writeHead(200)
            res.end(fs.readFileSync(`${__dirname}/servershit/404.html`))
        } else {
            res.end(`Welcome to my terrible error page, I dont want to make proper error pages so figure out the error yourself, if you are sure this page is real please send me the following error code (or if you have a slight clue on what you are doing figure it out yourself):
    ${e}`)
        }
    }
});

server.listen(80); //6 - listen for any incoming requests

console.log(`Testosterone framework goin' up`)
