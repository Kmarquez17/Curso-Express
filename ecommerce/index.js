const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const isRequestAjaxDrApi = require('./utils/isRequestAjaxDrApi') 
const boom = require('boom')

const {
  logErrors,
  clientErrorHandler,
  errorHandler,
  wrapErrors
} = require("./utils/middlewares/errorsHandlers");

// app
const app = express();

// middlewares
app.use(bodyParser.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect
app.get("/", function(req, res) {
  res.redirect("/products");
});

app.use(function(req, res,next){
  if (isRequestAjaxDrApi(req)){
    const {
      output:{statusCode, payload}
    } = boom.notFound()

    res.status(statusCode).json(payload)
  }

  res.status(404).render("404")

})
// error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(wrapErrors);

// server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});


