const router = require("express").Router();
const user = require("./user");
const content = require("./content");

router.use("/", user);
router.use("/content", content);

module.exports = router;
