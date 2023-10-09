module.exports = (sequelize, DataTypes) =>
  sequelize.define("userReservations", {
    userReservationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    movieName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    reserveDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    seatsReserved:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'createdTimeStamp',
    updatedAt: false
  });
