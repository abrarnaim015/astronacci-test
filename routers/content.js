const route = require("express").Router();
const ContentController = require("../controllers/content");

route.get("/", ContentController.getAllContent);
route.get("/category", ContentController.getAllCategoryContents);
route.get("/category/name", ContentController.getCategoryContentByName);
route.get("/membership", ContentController.getContentByMembershipType);

module.exports = route;
