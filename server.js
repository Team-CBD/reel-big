var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Body parser Middleware
//app.use(bodyParser);

app.use(express.static("public"));

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function()
{
    app.listen(PORT, function()
    {
        console.log("App listening on PORT " + PORT);
    });
});