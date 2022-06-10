const express = require('express');
// const path = require('path');
const { PrismaClient } = require('@prisma/client')

const userRoutes = require('./routes/user');

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

app.use('/auth', userRoutes);

module.exports = app;