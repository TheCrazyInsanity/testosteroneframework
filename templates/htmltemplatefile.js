shittoreturn = null
var exportshit = function(url, params, res, req){
    const fs = require("fs")
    //Do shit here
    shittoreturn = fs.readFileSync(`${__dirname}/index.html`)
    //Stop doing shit here
    return shittoreturn
}
module.exports ={
    exportshit: exportshit
}