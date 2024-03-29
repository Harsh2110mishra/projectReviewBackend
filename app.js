require("dotenv").config();
const { urlencoded } = require("express");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// regular middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: `${process.env.CLIENT_URL}`,
  })
);

// For swagger documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// cookies & file middlewares
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));


//imported all routes
const home = require("./routes/home");
const user = require("./routes/user");
const project = require("./routes/project");

//imported router middleware
app.use("/", home);
app.use("/api/", user);
app.use("/api/", project);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// export app.js
module.exports = app;
