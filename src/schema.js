import dotenv from "dotenv";
dotenv.config();
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GraphQL schema definitions
const typeDefs = `
  type User {
  id: String!
  username: String!
  balance: Int!
  level: Int!
  level_target: Int!  
  power: Int!
  tap_value: Int!     
  power_capacity: Int!  
  last_seen: Int!
}

  type Query {
    users: [User!]!
    user(id: String!, username: String!): User
  }

  type Mutation {
    updateUser(id: String!, balance: Int!, power: Int!, level: Int!, level_target: Int!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: async () => {
      const { data } = await supabase.from('users').select('*');
      return data; 
    },
    user: async (_, { id, username }) => {
      let { data: user } = await supabase.from('users').select('*').eq('id', String(id)).single();
      
      // If the user is not found, create a new user
      if (!user) {
        const newUser = {
          id,
          username: username, 
          balance: 0,
          level: 1,
          level_target: 500,
          power: 500,
          tap_value: 1,
          power_capacity: 500, 
          last_seen: 0
        };
        await supabase.from('users').insert(newUser).single();
        let { data: createdUser } = await supabase.from('users').select('*').eq('id', id).single();
        user = createdUser; 
        
      }
      if(user.last_seen!=0){
        let secondsPassed=Math.round(( Date.now() - user.last_seen)/1000);
        let updatedPower=Math.min(user.power_capacity, user.power + secondsPassed);
        await supabase.from('users').update({ power:updatedPower, last_seen: Date.now() }).eq('id', user.id).single();
        let { data: updatedUser } = await supabase.from('users').select('*').eq('id', id).single();
        user=updatedUser;
      }
      return user;
    },
  },
  Mutation: {
    updateUser: async (_, { id,  balance, power, level, level_target}) => {
      const { data } = await supabase.from('users').update({ balance, power, level, level_target, last_seen: Date.now() }).eq('id', id).single();
      return data;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });