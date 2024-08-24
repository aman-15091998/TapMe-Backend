import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from './src/schema.js';

// Create a Yoga instance
const yoga = createYoga({
    schema, 
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: ['*'],
      methods: ['GET', 'POST']
    }
});

export const server = createServer(yoga);




