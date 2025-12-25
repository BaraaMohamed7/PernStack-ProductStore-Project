import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })
}
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
      ip: req.ip,
    });


    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: 'Access denied. Bot traffic is not allowed.' });
      } else {
        return res.status(403).json({ message: 'Forbidden.' });
      }
    }

    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      return res.status(403).json({ message: 'Access denied. Spoofed bot traffic is not allowed.' });
    }

    next();


  } catch (error) {
    console.error('Error in ArcJet middleware: ', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
})


app.use('/api/products', productRoutes)

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`
  } catch (error) {
    console.error('Error initializing database: ', error);
  }

}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`);
  });
  console.log('Database initialized');
})



