var db = require("../models");
const sequelize_fixtures = require("sequelize-fixtures");

module.exports = function(app)
{
    app.get("/api/profile", function(req, res)
    {
        sequelize_fixtures.loadFile("./fixtures/test.js", db).then(function()
        {
            db.profile.findAll({
                attributes: ["id", "username", "firstName", "lastName"]
            })
            .then(function(result)
            {
                res.json(result);
            });
        });
    });

    app.get("/api/catch", function(req, res)
    {
        sequelize_fixtures.loadFile("./fixtures/test catch.js", db).then(function()
        {
            db.catchHistory.findAll({
                attributes: ["id", "fish_type", "location"]
            })
            .then(function(result)
            {
                res.json(result);
            });
        });
    });

    app.get("/api/tackle", function(req, res)
    {
        db.tackleBox.findAll({
            attributes: ["id", "rod", "rodAmount", "bait", "baitAmount", "lure", "lureAmount"]
        })
        .then(function(result)
        {
            res.json(result);
        });
    });

    app.get("/api/rig", function(req, res)
    {
        db.rig.findAll({
            attributes: ["id", "currentRod", "currentBait", "currentBaitAmount", "currentLure", "currentLureAmount"]
        })
        .then(function(result)
        {
            res.json(result);
        });
    });
}