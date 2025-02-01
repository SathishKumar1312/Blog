const express = require('express');
const router = express.Router();

const { getCategories, getSingleCategory, newCategory, updateCategory, deleteCategory } = require('../controller/categoryController');

router.route('/')
    .get( getCategories )
    .post( newCategory );

router.route('/:id')
    .get( getSingleCategory )
    .put( updateCategory )
    .delete( deleteCategory );

module.exports = router;