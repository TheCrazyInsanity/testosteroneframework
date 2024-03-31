const { workerData, parentPort } = require('worker_threads')
const fs = require("fs")
var workerDatadec = JSON.parse(workerData)
// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"

parentPort.postMessage(fs.readFileSync(`${__dirname}/index.html`))
setTimeout(function2, 3000);