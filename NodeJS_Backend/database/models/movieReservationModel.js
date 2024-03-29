module.exports = (sequelize, DataTypes) =>
  sequelize.define("movieReservations", {
    movieReservationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    movieName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    dateOfViewing: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    noOfSeatsRemaining:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'createdTimeStamp',
    updatedAt: 'lastReservationTimeStamp',

  });
