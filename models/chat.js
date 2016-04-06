'use strict';

module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    content: DataTypes.STRING,
    timestamp: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Chat.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: 'to_user',
          targetKey: 'id'
        });
        Chat.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: 'from_user',
          targetKey: 'id'
        });
      }
    }
  });
  return Chat;
};