const express = require('express');
const router = express.Router();

const { getPosts, getSinglePost, newPost, updatePost, deletePost, getPostsByCategory } = require('../controller/postController');

router.route('/')
    .get( getPosts )
    .post( newPost );

router.route('/:id')
    .get( getSinglePost )
    .put( updatePost )
    .delete( deletePost );

router.get('/category/:categoryId', getPostsByCategory);

module.exports = router;