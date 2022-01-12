const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const url = require('url')
const queryString = require('querystring')

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db.db')

app.get("/dataStatic", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/db.json")
})

app.get("/dataSQLite", (req, res) => {
    let sql = 'SELECT * FROM studentDB'

    let resObj = {
        res: {},
        status: false
    }

    db.all(sql, [], (er, rows) => {
        if (er) {
            console.log(er)
        } else {
            resObj.status = true
            resObj.res = rows
        }

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.json(resObj)
    })
})

app.get("/edit", (req, res) => {
    let parsedUrl = url.parse(req.url)
    let parsedQS = queryString.parse(parsedUrl.query)

    console.log(parsedQS);

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json({ success: true });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})