'use strict';
import passport from 'passport';
import Strategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()

passport.use(
    new Strategy(async (username, password, done) => {
      console.log('localstrategy', username, password);
      // get user by username (in this case email) from userModel/getUserLogin
      const user = await User.findOne({ username });
      // if user is undefined
      if (!user) {
        return done(null, false, 'user not found');
      }
      // if passwords dont match
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, 'password incorrect');
      }
      // if all is ok
      // convert document to object
      const strippedUser = user.toObject();
      delete strippedUser.password;
      return done(null, strippedUser);
    })
);

passport.use(
    new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET_OR_KEY,
        },
        (payload, done) => {
          // console.log('jwt payload', payload);
          done(null, payload);
        }
    )
);

export default passport;

