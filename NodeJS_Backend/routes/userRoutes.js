module.exports = (express, app) => {
  const controller = require("../controllers/userController.js"); 
  const router = express.Router();

  // Select all users.
  router.get("/", controller.findAllUsers);

  // Select a single user with id.
  router.get("/:username", controller.findSingleUser);

  // Select one user from the database if username and password are a match
  router.get("/login/:username", controller.loginUser);

  // Create a new user.
  router.post("/create", controller.createUser);

  router.get("profile/:username", controller.updateUser);
  // Select one user from the database if username and password are a match.
  // router.post("/", controller.loginUser);
  
  // Add routes to server.
  app.use("/api/users", router);
};
