var http = require('http');
var path = require('path');
const fs = require('fs');
const url = require('url');
const toml = require('toml');
const { equal } = require('assert');

function ext2ICON(ext) {
    switch (ext) {
        case ".png":
            return "/icons/type_image.png"
        case ".jpg":
            return "/cons/type_image.png"
        case ".jpeg":
            return "/icons/type_image.png"
        case ".php":
            return "/icons/type_php.png"
        case ".ogg":
            return "/icons/type_audio.png"
        case ".wav":
            return "/icons/type_audio.png"
        case ".mp3":
            return "/icons/type_audio.png"
        case ".flac":
            return "/icons/type_audio.png"
        default:
            return "/icons/type_binary.png"
    }
}

function ext2MIME(ext) {
    switch (ext) {
        case ".png":
            return "image/png"
        case ".jpg":
            return "image/jpeg"
        case ".jpeg":
            return "image/jpeg"
        case ".avif":
            return "image/avif"
        case ".svg":
            return "image/svg+xml"
        case ".obj":
            return "model/obj"
        case ".css":
            return "text/css"
        case ".html":
            return "text/html"
        case ".csv":
            return "text/csv"
        case ".js":
            return "text/js"
        case ".xml":
            return "text/xml"
        case ".ogg":
            return "audio/ogg"
        case ".mp3":
            return "audio/mpeg"
        case ".zip":
            return "application/zip"
        case ".json":
            return "application/json"
        case ".pdf":
            return "application/pdf"
        default:
            return "text/plain"
    }
}

var conf = toml.parse(fs.readFileSync('ttfw.conf','utf8'));

function Handler_JS(req, res, params, urlpath, module_filepath) {
    var module = require(module_filepath)
    var response = module.exportshit(urlpath, params, res, req)
    res.end(response)
}

var module_filenames = {".js" : Handler_JS}

var server = http.createServer(async function (req, res){ 
    var pathname = url.parse(req.url, true).pathname
    var params = url.parse(req.url, true).query
    try {
        if (fs.lstatSync(`${__dirname}/servershit${pathname}`).isFile()) { 
            var extension = path.extname(pathname)
            res.setHeader("Content-Type", ext2MIME(extension))
            res.write(fs.readFileSync(`${__dirname}/servershit${pathname}`))
            res.end()
        } else if (fs.lstatSync(`${__dirname}/servershit${pathname}`).isDirectory()) {
            var points = fs.readdirSync(`${__dirname}/servershit${pathname}`).filter(fn => fn.startsWith('index'));
            if (points.length == 0 && conf.autoindex == true) { // autoindex time
                res.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>.pathline,body{font-size:14px}body{font-family:Arial,Helvetica,sans-serif;background:#eee}#page{width:800px;margin:20px auto;background:#fff;padding:25px;border:1px solid #eee}.pathline{border-radius:3px;background:#f3f3f3;padding:7px 10px;margin-bottom:10px;letter-spacing:.5px}.pathline img{width:13px;margin-right:3px}.pathline a{color:#777}.pathline a:hover{color:#333}#dirlist table a{color:#222}#dirlist table{width:100%;text-align:left}#dirlist table th{padding:5px 10px;font-size:15px;cursor:pointer}#dirlist table td{border-bottom:1px solid #eee;vertical-align:middle;font-size:12px}#dirlist table td a{padding:10px 0;display:block;width:500px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;font-size:14px}#dirlist table img{vertical-align:middle;width:16px}#dirlist tr:hover td{background:#f9f9f9}#footer{margin-top:10px;text-align:center}#footer address{color:#aaa;font-style:normal;font-size:12px}</style><title>Index</title></head><body><div id="page"><div class="pathline"><a href="/"><img src="/icons/home.png" alt=""></a> ${pathname}</div><div id="dirlist"><table><tr><th valign="top"><img src="/icons/blank.png"></th><th><a>Name</a></th><th><a>Last modified</a></th><th><a>Size</a></th><th><a>Description</a></th></tr><tr><td valign="top"><img src="/icons/back.png" alt="[   ]"></td><td><a href=" ">Parent Directory</a></td><td>&nbsp;</td><td align="right">  - </td><td>&nbsp;</td></tr>`)
                fs.readdirSync(`${__dirname}/servershit${pathname}`).forEach(file => {
                    var filepath = `${__dirname}/servershit${pathname}/${file}`
                    var metadata = fs.statSync(filepath)
                    res.write(`<tr><td valign="top"><img src="${(metadata.isFile() == true ? ext2ICON(path.extname(filepath)) : "/icons/type_folder2.png")}" alt="[   ]"></td><td><a href="${pathname}/${file}">${file}</a></td><td align="right">${metadata.atime.getUTCFullYear()}-${metadata.atime.getUTCMonth()}-${metadata.atime.getUTCDay()} ${metadata.atime.getUTCHours()}:${metadata.atime.getUTCMinutes()}</td><td align="right">${(metadata.isFile() == true ? metadata.size : "-")}</td><td>&nbsp;</td></tr>`);
                })
                res.end();
            } else {
                for (let entp of points) {
                    if (module_filenames[path.extname(entp)] != undefined) {
                        var lang_module = module_filenames[path.extname(entp)]
                        lang_module(req ,res, params, pathname, `${__dirname}/servershit${pathname}${entp}`)
                    }
                }
            }
        }
    } catch (e) {

    }
});

console.log(`Testosterone framework goin' up`)
server.listen(conf.port);
console.log("Listening to http at " + conf.http.port)

