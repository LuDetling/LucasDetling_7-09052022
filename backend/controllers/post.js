const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

exports.showPosts = async (req, res) => {
  try {
    const posts = await prisma.Post.findMany();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.showPost = async (req, res) => {
  try {
    const post = await prisma.Post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      post,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await prisma.Post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (req.user.id != post.userId) {
      console.log("Vous n'avez pas le droit !");
      return;
    }
    const filename = post.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, async () => {
      await prisma.Post.delete({
        where: { id: Number(req.params.id) },
      });
      res.status(200).json({
        message: "Objet supprimé !",
      });
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

exports.updatePost = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.Post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (req.user.id != post.userId) {
      console.log("Vous n'avez pas le droit !");
      return;
    }
    if (!req.file) {
      await prisma.Post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
        },
      });
    } else {
      await prisma.Post.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          content: content,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        },
      });
    }
    res.status(200).json({
      message: "Objet modifié !",
    });
  } catch (error) {
    res.status(501).json({
      error,
    });
    console.log(error);
  }
};

exports.createPost = async (req, res, next) => {
  const { title, content, user } = req.body;
  const newPost = {
    title: title,
    content: content,
    userId: Number(user),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  };
  try {
    if (req.user.id != user) {
      throw "User ID non valable !";
    }
    await prisma.Post.create({ data: newPost });
    res.status(201).json({
      message: "Objet enregistré !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.likePost = async (req, res, next) => {
  const { like, userId } = req.body;
  const post = await prisma.Post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  console.log(post);
  console.log(like, userId);
  // pas acces aux tableaux des userliked disliked
  try {
    if (like === 1) {
      // si déja dislike avec cet userid on retire
      if (post.dislikedBy.includes(userId)) {
        await prisma.Post.updatePost({
          where: {
            id: Number(req.params.id),
          },
          data: {
            dislikes: {
              increment: 1,
            },
            dislikedBy: {
              unset: userId,
            },
          },
        });
      }
      // ensuite on ajoute
      await prisma.Post.updatePost({
        where: {
          id: Number(req.params.id),
        },
        data: {
          likes: {
            increment: 1,
          },
          likedBy: {
            unset: userId,
          },
        },
      });
    }
    if (like === 0) {
      if (post.dislikedBy.includes(userId)) {
        await prisma.Post.updatePost({
          where: {
            id: Number(req.params.id),
          },
          data: {
            dislikes: {
              increment: 1,
            },
            dislikedBy: {
              unset: userId,
            },
          },
        });
      } else if (post.likedBy.includes(userId)) {
        await prisma.Post.updatePost({
          where: {
            id: Number(req.params.id),
          },
          data: {
            likes: {
              increment: -1,
            },
            likedBy: {
              unset: userId,
            },
          },
        });
      }
    }
    if (like === -1) {
      if (post.likedBy.includes(userId)) {
        await prisma.Post.updatePost({
          where: {
            id: Number(req.params.id),
          },
          data: {
            likes: {
              increment: -1,
            },
            likedBy: {
              unset: userId,
            },
          },
        });
      }
      await prisma.Post.updatePost({
        where: {
          id: Number(req.params.id),
        },
        data: {
          dislikes: {
            increment: 1,
          },
          dislikedBy: {
            push: userId,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
