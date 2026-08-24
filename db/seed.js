const pool = require('./pool');

const products = [
  // Headphones
  { name: 'WH-1000XM5', description: 'Industry-leading noise canceling over-ear headphones with 30-hour battery life.', price: 399.99, stock: 45, category: 'Headphones' },
  { name: 'WH-CH720N', description: 'Lightweight noise canceling headphones with up to 35 hours of battery life.', price: 149.99, stock: 60, category: 'Headphones' },
  { name: 'MDR-7506', description: 'Professional studio monitor headphones with closed-ear design.', price: 99.99, stock: 30, category: 'Headphones' },

  // Earbuds
  { name: 'WF-1000XM5', description: 'Truly wireless noise canceling earbuds with industry-leading sound quality.', price: 299.99, stock: 55, category: 'Earbuds' },
  { name: 'WF-C700N', description: 'Compact noise canceling truly wireless earbuds.', price: 119.99, stock: 70, category: 'Earbuds' },
  { name: 'LinkBuds S', description: 'Small, lightweight truly wireless earbuds with Adaptive Sound Control.', price: 199.99, stock: 40, category: 'Earbuds' },

  // Soundbars
  { name: 'HT-A7000', description: '7.1.2ch Dolby Atmos soundbar with 500W output.', price: 1399.99, stock: 15, category: 'Soundbars' },
  { name: 'HT-S2000', description: '3.1ch Dolby Atmos soundbar with built-in subwoofer.', price: 499.99, stock: 25, category: 'Soundbars' },
  { name: 'HT-X8500', description: '2.1ch single soundbar with built-in subwoofer and Dolby Atmos.', price: 349.99, stock: 20, category: 'Soundbars' },

  // Speakers
  { name: 'SRS-XB100', description: 'Compact portable Bluetooth speaker with punchy bass.', price: 59.99, stock: 90, category: 'Speakers' },
  { name: 'SRS-XG500', description: 'X-Series portable wireless speaker with powerful bass and lighting.', price: 349.99, stock: 20, category: 'Speakers' },
  { name: 'SRS-RA5000', description: '360 Reality Audio speaker for spatial sound throughout the room.', price: 399.99, stock: 18, category: 'Speakers' },

  // Turntables
  { name: 'PS-LX310BT', description: 'Belt-drive turntable with Bluetooth connectivity.', price: 199.99, stock: 12, category: 'Turntables' },
  { name: 'PS-HX500', description: 'Hi-Res USB turntable for vinyl-to-digital recording.', price: 399.99, stock: 8, category: 'Turntables' },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Wipe existing data (products first, since it references category)
    await client.query('DELETE FROM product');
    await client.query('DELETE FROM category');

    // Re-seed categories, "No Category" first
    const categoryNames = ['No Category', 'Headphones', 'Earbuds', 'Soundbars', 'Speakers', 'Turntables'];
    const categoryIds = {};

    for (const name of categoryNames) {
      const { rows } = await client.query(
        'INSERT INTO category (name) VALUES ($1) RETURNING id',
        [name]
      );
      categoryIds[name] = rows[0].id;
    }

    // Seed products
    for (const p of products) {
      await client.query(
        `INSERT INTO product (name, description, price, stock, category_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [p.name, p.description, p.price, p.stock, categoryIds[p.category]]
      );
    }

    await client.query('COMMIT');
    console.log(`Seeded ${categoryNames.length} categories and ${products.length} products.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
  } finally {
    client.release();
    pool.end();
  }
}

seed();