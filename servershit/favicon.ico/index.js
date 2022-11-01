shittoreturn = null
const fs = require("fs")
//Do shit here
shittoreturn = fs.readFileSync(`${__dirname}/pfp48quality.ico`)
//Stop doing shit here
var exportshit = function(){
    return shittoreturn
}
module.exports ={
    exportshit: exportshit
}