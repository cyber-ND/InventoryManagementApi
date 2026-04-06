const Product = require('../models/productModel');

// Create
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({message: 'Product created successfully', product});
};

// Get all
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({message: 'Products retrieved successfully', products});
};

// Get one
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json({message: 'Product retrieved successfully', product});
};

// Update
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({message: 'Product updated successfully', product});
};

// Delete
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted'});
};
// newChange-added response messages to all the product controller functions to provide consistent feedback to the client and improve the clarity of API responses, making it easier for clients to understand the outcome of their requests.

