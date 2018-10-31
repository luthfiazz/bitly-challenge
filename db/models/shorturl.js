'use strict';
module.exports = (sequelize, DataTypes) => {
  const shortUrl = sequelize.define('shortUrl', {
    title: DataTypes.STRING,
    short: DataTypes.TEXT,
    url: DataTypes.TEXT,
    idUser: DataTypes.INTEGER
  }, {});
  shortUrl.associate = function(models) {
    models.shortUrl.hasMany(models.track,{
      foreignKey:'shortUrlId'
    })
    models.shortUrl.belongsTo(models.user,{
      foreignKey:'idUser'
    })
    };
  return shortUrl;
};