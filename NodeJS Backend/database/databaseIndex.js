const {Sequelize, DataTypes} = require("sequelize");
const config = require("./dbConfig.js");

const db = {
  Op: Sequelize.Op
}

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD), {
  host: config.HOST,
  dialect: config.DIALECT
}

db.users = require("./models/userModel.js")(db.sequelize, DataTypes);
db.movies = require("./models/movieModel.js")(db.sequelize, DataTypes);
db.ageRating = require("./models/ageRatingModel.js")(db.sequelize, DataTypes);
db.reviews = require("./models/reviewModel.js")(db.sequelize, DataTypes);

db.users.belongsToMany(db.movies, {through: db.reviews});
db.movies.belongsToMany(db.users, {through: db.reviews});
db.ageRating.hasMany(db.movies);
db.movies.belongsTo(db.ageRating);

db.sync = async () => {
  await db.sequelize.sync();
  await seedUserData();
}

async function seedUserData() {
}

async function seedMovieData() {
}
async function seedReviewData() {
}
async function seedAgeRatingData(){

}

module.export = db;
