const express = require("express")
const app = express()
const morgan = require('morgan')
// const user = require('./users.json')
// console.log(user.users[0].password)
const cors  = require("cors")

app.use(cors())
app.use(morgan())
app.use(express.json())
app.use(require('./routes/routes'))

app.listen(5000, ()=>{
    console.log("server started at port 5000")
})