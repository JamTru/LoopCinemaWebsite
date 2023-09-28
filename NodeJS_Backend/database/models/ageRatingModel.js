module.exports = (sequelize, DataTypes) =>
  sequelize.define("ageRating", {
    ageRating: {
      type: DataTypes.STRING(10),
      primaryKey: true
    }
  }, {
    timestamps: false
  });
