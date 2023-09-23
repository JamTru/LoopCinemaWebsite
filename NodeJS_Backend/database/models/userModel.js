module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    passwordHash: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dateOfCreation: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false
  });
