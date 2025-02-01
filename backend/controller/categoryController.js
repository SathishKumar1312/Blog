const Category = require('../models/Category');

const getCategories = async(req,res) => {
    try {
        const categories = await Category.find().sort({createdAt: -1});
        res.status(200).json(categories);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const getSingleCategory = async (req,res) => {
    try{
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(category)
    } catch(e) {
        res.status(500).json({message: e.message});
    }
}

const newCategory = async (req,res) => {
    const { name, slug, description } = req.body;
    try {
        const newCategory = new Category({ name, slug, description })
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const updateCategory = async(req,res) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }
        category.name = req.body.name || category.name;
        category.slug = req.body.slug || category.slug;
        category.description = req.body.description || category.description;
        category.updatedAt = Date.now();

        await category.save();

        res.status(200).json(category)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const deleteCategory = async (req,res) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }
        await Category.findByIdAndDelete(id);
        res.status(200).json({message: "deleted successfully!"})
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = {getCategories, getSingleCategory, newCategory, updateCategory, deleteCategory};