const path = require('path');
const glob = require('glob');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = process.env;
const { User } = require('mongoose').models;
let acl = require('acl');
acl = new acl(new acl.memoryBackend());

module.exports = () => {
  const files = glob.sync('./modules/**/*.policy.js');
  files.forEach(file => require(path.resolve(file)).invokeRolesPolicies(acl));
};
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  algorithms: ['HS256']
};
const jwtStart = new JwtStrategy(jwtStrategyOptions, (payloads, done) => {
  User.findById(payloads._id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
});
passport.use(jwtStart);

global.policies = {};

/**
 * Check whether user is allowed to access requested route or not
 * @function
 *
 * @param {Object} req The express request
 * @param {Object} res The express response
 * @param {Function} next - The express next middleware function
 * @return {undefined}
 */
global.policies.isAllowed = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    try {
      if (err) {
        throw err;
      }
      req.user = user;
      const role = (req.user && req.user.role) || 'viewer';
      acl
        .areAnyRolesAllowed(role, req.route.path, req.method.toLowerCase())
        .then(isAllowed => {
          if (isAllowed) {
            return next();
          }
          return res.status(403).json({ message: 'Unauthorized access.' });
        });
    } catch (err) {
      console.log(err);
    }
  })(req, res, next);
};
