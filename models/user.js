'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    password_hash: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};