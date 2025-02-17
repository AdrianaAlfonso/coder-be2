import passport from 'passport';

const passportCall = async (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default passportCall;
