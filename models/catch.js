"use strict"
module.exports = function(sequelize, DataTypes)
{
    var catchHistory = sequelize.define("Catch History", 
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fish_type:
        {
            type: DataTypes.STRING
        },
        location:
        {
            type: DataTypes.INTEGER
        },
        userId:
        {
            type: DataTypes.INTEGER
        }
    });
    return catchHistory;
};