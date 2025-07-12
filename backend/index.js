const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { allowOrigins } = require("./src/configs/constants");

// Setting for CORS
let corsOptions = {
  origin: function (origin, callback) {
    if (origin === "http://localhost:3000") {
      callback(null, true);
    } else if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      console.info("origin", origin);
      console.info("allowOrigins", allowOrigins);
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-HTTP-Method-Override", "Accept"],
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// Import routes
require("./src/routes/hole.in.one.routes")(app);

// Set port
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
