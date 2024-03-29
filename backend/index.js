const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const cors = require("cors")

// Setting for CORS
var corsOptions = {
  origin: "http://frontend",
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./modules/models")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  })

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." })
})

// Import routes
require("./modules/routes/hole.in.one.routes")(app)

// Set port
const PORT = process.env.PORT || 5500
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
