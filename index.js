const express = require('express')
var methodOverride = require('method-override')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use('/', booksRouter)
app.use(error404)



const PORT = process.env.PORT || 7070
app.listen(PORT)