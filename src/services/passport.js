import passport from 'passport';
import jwt from 'passport-jwt';
import { getUserById } from '../controllers/userController.js';

const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = jwt;

const initiatePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'fake-secret',
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    done(null, user);
  });
};

export default initiatePassport;
