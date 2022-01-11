const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get("/data", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + "/db.json")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})