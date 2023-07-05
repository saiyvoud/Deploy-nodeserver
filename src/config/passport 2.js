import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { SECRET_KEY } from "./globalKey.js";
import { Models } from "../model/index.js";
import LocalStrategy   from "passport-local";

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = SECRET_KEY;
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  //issuer: config.jwt.issuer,
  //audience: config.jwt.audience,
};
const configPassport = (passport) => {
  // passport.use(
  //   new JwtStrategy(opts, (jwt_payload, done) => {
  //       console.log(jwt_payload);
  //     return done(null, jwt_payload);
  //   })
  // );
  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      console.log(jwt_payload);
    await Models.User.findOne({ id: jwt_payload.id }, (err, user) => { 
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};
export default configPassport;
