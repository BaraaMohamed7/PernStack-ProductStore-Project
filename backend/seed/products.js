import { sql } from '../config/db.js';
const SampleProducts = [
  {
    title: "Sample Product 1",
    description: "This is a description for Sample Product 1.",
    price: 19.99,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Sample Product 2",
    description: "This is a description for Sample Product 2.",
    price: 29.99,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Sample Product 3",
    description: "This is a description for Sample Product 3.",
    price: 39.99,
    image: "https://via.placeholder.com/150",
  },
];


async function seedProducts() {
  try {
    for (const product of SampleProducts) {
      await sql.query(
        'INSERT INTO products (title, description, price, image) VALUES ($1, $2, $3, $4)',
        [product.title, product.description, product.price, product.image]
      );
    }
    console.log('Sample products seeded successfully.');
  } catch (error) {
    console.error('Error seeding sample products:', error);
  }
}

await seedProducts();