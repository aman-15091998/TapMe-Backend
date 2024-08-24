import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './src/schema.js';

// Create a Yoga instance
const yoga = createYoga({ schema });

export const server = createServer((req, res) => {
    // Apply CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust origin as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
  
    // Delegate request to Yoga
    yoga.handleRequest(req, res);
  });




