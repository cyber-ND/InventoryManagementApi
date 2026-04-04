const Product = require('../models/productModel');
const cloudinary = require("../middleware/cloudinary");



const User = require("../models/userModel");
const sendEmail = require("../middleware/emailSender");

exports.createProductwithEmail = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({ name, price });
    await product.save();

    // 🔥 Get all admins
    const admins = await User.find({ role: "admin" });
    const adminEmails = admins.map(a => a.email);

    // 📧 Send email
    const subject = "New Product Created";
    const message = `
      <h3>New Product Alert 🚀</h3>
      <p>A new product has been created:</p>
      <ul>
        <li><strong>Name:</strong> ${product.name}</li>
        <li><strong>Price:</strong> ${product.price}</li>
      </ul>
    `;

    if (adminEmails.length > 0) {
      await sendEmail(adminEmails, subject, message);
    }

    return res.status(201).json({
      message: "Product created and admins notified",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




exports.updateProductImage = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.ImageUrl) {
      const publicId = product.ImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    product.ImageUrl = req.file.path;

    await product.save();

    res.status(200).json({
      message: "Image updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

// Get all
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Get one
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
};

// Update
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

// Delete
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};


