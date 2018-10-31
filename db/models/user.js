'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    notelepon: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    models.user.hasMany(models.shortUrl, {
      foreignKey:'idUser'
    })

  };
  return user;
};  