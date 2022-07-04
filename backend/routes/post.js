const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.get("/", auth, postCtrl.showPosts);
router.get("/:id", auth, postCtrl.showPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post('/:id/like', auth, multer, postCtrl.likePost);

module.exports = router;
