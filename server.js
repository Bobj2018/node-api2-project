const express = require('express');
const cors = require('cors');

//ROUTERS
const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
	res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
});

module.exports = server;
