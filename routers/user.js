const route = require("express").Router();
const UserController = require("../controllers/users");

route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.post("/googlelogin", UserController.googleLogin);
route.post("/facebooklogin", UserController.facebookLogin);
route.put("/update/membership/type", UserController.updateMembershipType);
route.get("/clientid", UserController.getClientIdGoogle);

module.exports = route;
