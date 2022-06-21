const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.showPosts = async (req, res) => {
  try {
    const posts = await prisma.Post.findMany();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.createPost = async (req, res, next) => {
  const { title, content, userId, image } = req.body;
  console.log(userId);
  console.log(req.user.id);
  const newPost = {
    title: title,
    content: content,
    userId: userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  };
  try {
    if (req.user.id != userId) {
      throw "User ID non valable !";
    }
    await prisma.post.create({ data: newPost });
    res.status(201).json({
      message: "Objet enregistré !",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
