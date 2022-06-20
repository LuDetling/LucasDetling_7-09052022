const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");

router.post("/newpost", postCtrl.createPost);
router.get("", postCtrl.showPost);

module.exports = router;