// productController.js
import Product from '../models/product.model.js';

export const createProductController = async (req, res) => {
  try {
    const {
      display_id,
      owner,
      name,
      category,
      characteristics,
      features,
      brand,
      sku
    } = req.body;

    const newProduct = await Product.create({
      display_id,
      owner,
      name,
      category,
      characteristics,
      features,
      brand,
      sku
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.display_id = req.body.display_id || product.display_id;
    product.owner = req.body.owner || product.owner;
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.characteristics = req.body.characteristics || product.characteristics;
    product.features = req.body.features || product.features;
    product.brand = req.body.brand || product.brand;
    product.sku = req.body.sku || product.sku;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

