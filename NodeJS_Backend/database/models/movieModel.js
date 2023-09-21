module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    movieID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(280),
      allowNull: false
    }
  }, {
    timestamps: false
  });
