module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    passwordHash: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'createdTimeStamp',
    updatedAt: false
  });
