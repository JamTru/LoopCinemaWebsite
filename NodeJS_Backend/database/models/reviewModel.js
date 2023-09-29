module.exports = (sequelize, DataTypes) =>
  sequelize.define("reviews", {
    reviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(1000)
    }
  }, {
    timestamps: true,
    createdAt: 'createdTimeSTamp',
    updatedAt: false
  });
