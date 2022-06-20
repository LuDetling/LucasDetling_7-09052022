const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.showPost = async (req, res) => {
    try {
        const posts = await prisma.Post.findMany();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.createPost = async (req, res, next) => {

    post = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        likes: 0,
        dislikes: 0,
    }

    // imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
    //     }`,
    console.log(req.body);
    try {
        await prisma.post.create({ data: post });
        res.status(201).json({
            message: "Objet enregistré !",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error,
        });
    }
};


