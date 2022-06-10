const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const app = express();

exports.showUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    user = {
      email: req.body.email,
      password: hash,
    };
    try {
      await prisma.user.create({ data: user });
      res.status(201).json({
        message: "Utilisateur créé !",
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(401).json({
        error: "Utilisateur non trouvé !",
      });
    }
    try {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({
          error: "Mot de passe incorrect !",
        });
      }
      const response = res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          {
            userId: user.id,
          },
          "RANDOM_TOKEN_SECRET",
          {
            expiresIn: "24h",
          }
        ),
      });
      // RECUP LE TOKEN DE CONNEXION POUR LOCALSTORAGE
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
