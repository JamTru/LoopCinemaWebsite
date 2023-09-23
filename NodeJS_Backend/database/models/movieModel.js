module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    movieID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    }
  }, {
    timestamps: false
  });
