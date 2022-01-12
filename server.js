const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const url = require('url')
const queryString = require('querystring')

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db.db')

let lastID = 4

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
    res.setHeader('Access-Control-Allow-Origin', '*')
    let parsedUrl = url.parse(req.url)
    let parsedQS = queryString.parse(parsedUrl.query)

    let sql = 'UPDATE studentDB SET studentName=(?), surname=(?), fatherName=(?), birthDate=(?), severalMark=(?) WHERE id=(?)'
    let resObj = {
        res: "FAILED",
        success: false
    }

    db.run(sql, [
        parsedQS.studentName,
        parsedQS.surname,
        parsedQS.fatherName,
        parsedQS.birthDate,
        parsedQS.severalMark,
        parsedQS.studentID
    ], (er) => {
        if (er) {
            console.log(er)
        } else {
            resObj.res = "SUCCESS"
            resObj.success = true
        }

        console.log("HERE!!!")
        res.json(resObj)
    })
})

app.get("/delete", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let parsedUrl = url.parse(req.url)
    let parsedQS = queryString.parse(parsedUrl.query)

    let sql = 'DELETE FROM studentDB WHERE id=(?)'
    let resObj = {
        res: false,
        status: "FAILED"
    }

    db.run(sql, [parsedQS.id], (er) => {
        if (er) {
            console.log(er)
        } else {
            resObj.res = true
            resObj.status = "SUCCESS"
        }

        res.json(resObj)
    })
})

app.get("/add", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let parsedUrl = url.parse(req.url)
    let parsedQS = queryString.parse(parsedUrl.query)

    let sql = 'INSERT INTO studentDB (studentName, surname, fatherName, birthDate, serveralMark, id) VALUE (?, ?, ?, ?, ?, ?)'
    let resObj = {
        res: false,
        status: 'FAILED'
    }

    db.run(sql, [
        parsedQS.studentName,
        parsedQS.surname,
        parsedQS.fatherName,
        parsedQS.birthDate,
        parsedQS.severalMark,
        parsedQS.id
    ], (er) => {
        if (er) {
            console.log(er)
        } else {
            resObj.res = true
            resObj.status = 'SUCCESS'
        }

        res.json(resObj)
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
