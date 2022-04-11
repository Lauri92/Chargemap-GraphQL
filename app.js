import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';
import dotenv from 'dotenv';
import connectMongo from './db/db.js';
import {checkAuth} from './utils/auth.js';
import helmet from 'helmet';

dotenv.config();
const port = process.env.PORT || 3000;

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({req}) => {
        if (req) {
          const user = await checkAuth(req);
          return {user, req};
        }
      },
    });

    const app = express();

    await server.start();

    server.applyMiddleware({app});
    app.use(helmet({}));

    app.get('/', async (req, res) => {
      if (req.secure) {
        res.send('Hello secure chargemap');
      } else {
        res.send('Not secure chargemap');
      }
    });

    const conn = await connectMongo();
    if (conn) {
      console.log('Connected successfully.');
      if (process.env.NODE_ENV === 'production') {
        await (async () => (await import('./utils/production.js')).default(app,
            port))();
      } else {
        await (async () => (await import('./utils/localhost.js')).default(app,
            port))();
      }
    } else {
      throw new Error('db not connected');
    }
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();
