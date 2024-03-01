// netlify/functions/root.js
import { join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function handler(event, context) {
  try {
    const filePath = join(__dirname, '..', '..', 'AHH', 'index4.html');
    const fileContents = await fs.readFile(filePath, 'utf8');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: fileContents,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}