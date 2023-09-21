module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    ageRating: {
      type: DataTypes.STRING(10),
      primaryKey: true
    }
  }, {
    timestamps: false
  });
