const express = require('express');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

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
app.use("/posts", postRoutes);

module.exports = app;