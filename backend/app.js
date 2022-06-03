const express = require('express');
// const path = require('path');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


// npx prisma studio 

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})


module.exports = app;