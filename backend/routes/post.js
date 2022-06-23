const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.get("/", postCtrl.showPosts);
router.get("/:id", postCtrl.showPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
