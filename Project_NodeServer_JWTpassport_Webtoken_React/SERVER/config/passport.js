import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import {userModel as User} from "../models/index.js";


export default (passport) =>{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.PASSPORT_SECERT;
    passport.use(
        new JwtStrategy(opts, function(jwt_payload, done){
            User.findOne({_id:jwt_payload._id}, (err, user)=>{
            if (err){
                return done(err, false);
            }
            if(user){
                return done(null,user);
            }else {
                done(null, false);
            }
        })
    }
    ))
}





