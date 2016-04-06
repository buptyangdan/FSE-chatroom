'use strict';
module.exports = function(sequelize, DataTypes) {
  var Announcement = sequelize.define('Announcement', {
    content: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Announcement.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Announcement;
};