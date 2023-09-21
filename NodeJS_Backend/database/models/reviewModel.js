module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(1000)
    }
  }, {
    timestamps: false
  });
