'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    uuid:DataTypes.STRING,
    shortUrlId: DataTypes.INTEGER,
    ipAddress: DataTypes.STRING,
    referrerUrl: DataTypes.TEXT
  }, {});
  track.associate = function(models) {
    models.track.belongsTo(models.shortUrl,{
      foreignKey:'shortUrlId'
    })
  };
  return track;
};