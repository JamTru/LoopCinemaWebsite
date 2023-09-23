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
//Reviews Table Relation
db.users.belongsToMany(db.movies, {through: db.reviews});
db.movies.belongsToMany(db.users, {through: db.reviews});
//
db.ageRating.hasMany(db.movies);
db.movies.belongsTo(db.ageRating);

db.sync = async () => {
  await db.sequelize.sync();
  await seedAgeRatingData();
  await seedMovieData();
}

async function seedUserData() {
  //TBD
}

async function seedMovieData() {
  const movieCount = db.movies.count();
  if(count > 0){
    return;
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  await.db.movies.create({
    title: "Dummy Movie",
    summary: "Dummy Summary Cool Beans",
    genre:"Dummy Genre",
    releaseDate: today,
    ageRating: "PG"
  });
}
async function seedReviewData() {
  //TBD
}
async function seedAgeRatingData(){
  const checkIfExists = db.ageRating.count();
  if (checkIfExists > 0) {
    return;
  }
  await.db.ageRating.create({ageRating:"G"});
  await.db.ageRating.create({ageRating:"PG"});
  await.db.ageRating.create({ageRating:"M"});
  await.db.ageRating.create({ageRating:"MA15+"});
  await.db.ageRating.create({ageRating:"R"});
}

module.export = db;
