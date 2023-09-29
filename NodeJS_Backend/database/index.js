const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const argon2 = require("argon2")

const db = {
  Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

db.movies = require("./models/movieModel.js")(db.sequelize, DataTypes);
db.ageRating = require("./models/ageRatingModel.js")(db.sequelize, DataTypes);
db.users = require("./models/userModel.js")(db.sequelize, DataTypes);
db.reviews = require("./models/reviewModel.js")(db.sequelize, DataTypes);

//Reviews Table has a One to Many Relation with Both Users and Reviews
//Movies / Users can have many reviews, but a review can only have one user/movie associated.
db.reviews.belongsTo(db.users);
db.reviews.belongsTo(db.movies);
db.movies.hasMany(db.reviews);
db.users.hasMany(db.reviews);


//AgeRating and Movies Relation
//A movie can only have one age rating, but any age rating can have any number of movies
db.ageRating.hasMany(db.movies);
db.movies.belongsTo(db.ageRating);

db.sync = async () => {
  await db.sequelize.sync();
  await seedUserData();
  await seedAgeRatingData();
  await seedMovieData();
};

async function seedUserData() {
  const userCount = await db.users.count();
  if (userCount > 0){
    return;
  }
  const hash = await argon2.hash("abc123",  { type: argon2.argon2id })
  const hash2 = await argon2.hash("def456", { type: argon2.argon2id })
  await db.users.create({
    username: "mbolger",
    passwordHash: hash,
    email: "mbolger@gmail.com",
  });
  await db.users.create({
    username: "shekhar",
    passwordHash: hash,
    email: "shekhar@gmail.com",
  });
}

async function seedMovieData() {
  const movieCount = await db.movies.count();
  if(movieCount > 0){
    return;
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  await db.movies.create({
    title: "Dummy Movie",
    summary: "Dummy Summary Cool Beans",
    genre:"Dummy Genre",
    releaseDate: today,
    ageRatingAgeRating: "PG"
  });
  await db.movies.create({
    title: "Harry Potter and the Goblet of Fire",
    summary: "The fourth movie in the Harry Potter franchise sees Harry (Daniel Radcliffe) returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron (Rupert Grint) and Hermione (Emma Watson). There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry's name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.",
    genre:"Fantasy / Adventure",
    releaseDate: "2005-11-18",
    ageRatingAgeRating: "M"
  });
  await db.movies.create({
    title: "Pacific Rim",
    summary: "Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot (Charlie Hunnam), an untested trainee (Rinko Kikuchi) and an old, obsolete Jaeger.",
    genre:"Action / Adventure",
    releaseDate: "2013-07-13",
    ageRatingAgeRating: "M"
  });
  await db.movies.create({
    title: "Shutter Island",
    summary: "The implausible escape of a brilliant murderess brings U.S. Marshal Teddy Daniels (Leonardo DiCaprio) and his new partner (Mark Ruffalo) to Ashecliffe Hospital, a fortress-like insane asylum located on a remote, windswept island. The woman appears to have vanished from a locked room, and there are hints of terrible deeds committed within the hospital walls. As the investigation deepens, Teddy realizes he will have to confront his own dark fears if he hopes to make it off the island alive.",
    genre:"Mystery / Suspense",
    releaseDate: "2010-02-18",
    ageRatingAgeRating: "MA15+"
  });
  await db.movies.create({
    title: "Spider-Man: Into the Spider-Verse",
    summary: "Bitten by a radioactive spider in the subway, Brooklyn teenager Miles Morales suddenly develops mysterious powers that transform him into the one and only Spider-Man. When he meets Peter Parker, he soon realizes that there are many others who share his special, high-flying talents. Miles must now use his newfound skills to battle the evil Kingpin, a hulking madman who can open portals to other universes and pull different versions of Spider-Man into our world.",
    genre:"Family / Action",
    releaseDate: "2018-12-26",
    ageRatingAgeRating: "PG"
  });
}
async function seedReviewData() {
  //TBD
}
async function seedAgeRatingData(){
  const checkIfExists = await db.ageRating.count();
  if (checkIfExists > 0) {
    return;
  }
  await db.ageRating.create({ageRating:"G"});
  await db.ageRating.create({ageRating:"PG"});
  await db.ageRating.create({ageRating:"M"});
  await db.ageRating.create({ageRating:"MA15+"});
  await db.ageRating.create({ageRating:"R"});
}

module.exports = db;
