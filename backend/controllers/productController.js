import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products
    ORDER BY created_at DESC`;
    res.status(200).json({ status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch products' });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (product.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: product[0] });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch product' });
  }
};
export const createProduct = async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !image || !price) {
    return res.status(400).json({ status: 'error', message: 'Title, image, and price are required' });
  }
  try {
    const newProduct = await sql`INSERT INTO products (title, description, image, price)
    VALUES (${title}, ${description}, ${image}, ${price}) RETURNING *`;
    res.status(201).json({ status: 'success', data: newProduct[0] });
  } catch (error) {

    res.status(500).json({ status: 'error', message: 'Failed to create product' });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price } = req.body;
  try {
    const existingProduct = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (existingProduct.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }
    const updatedProduct = await sql`UPDATE products SET
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      image = COALESCE(${image}, image),
      price = COALESCE(${price}, price),
      updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *`;
    res.status(200).json({ status: 'success', data: updatedProduct[0] });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update product' });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (existingProduct.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }
    await sql`DELETE FROM products WHERE id = ${id}`;
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to delete product' });
  }
};