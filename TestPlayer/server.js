const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.use("/public", express.static(__dirname+"/public"))
app.use("/dist", (req, res, next)=>{
    const tryFind = ()=>{
        let url = req.url;
        console.log("starting", url)
         
        if (url.slice(url.length - 1) == "/") {
            let testURL = `${url}index.js`
            if (fs.existsSync(__dirname+"/dist"+testURL) ) return testURL
        }
        if (url.slice(url.length - 3) != ".js") {
            let testURL = `${url}.js`
            if (fs.existsSync(__dirname+"/dist"+testURL) ) return testURL
        }
        return url
    }
    req.url = tryFind();
    console.log("result", req.url)

    next()
}, express.static(__dirname+"/dist"))
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})