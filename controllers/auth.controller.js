const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const User = require("../models/user.model");

const { success, error, validation } = require("../utils/responseApi.utils");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
                .status(422)
                // .json(validation(errors.array()[0].msg))
                .json(validation([errors.array().map((err) => err.msg)]));
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res
                .status(400)
                .json(error(res.statusCode, "Unable to save user in DB!", [err.message]))
        }
        const { _id, email, fullName } = user;
        return res
            .status(200)
            .json(success(res.statusCode, "OK", {
                id: _id,
                email,
                name:fullName
            }))
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
                .status(422)
                .json(error(res.statusCode, errors.array()[0].msg, [errors.array().map((err) => err.msg)]));
    }

    User.findOne({email}, (err, user) => {
        if(err || !user ){
            return res
                    .status(400)
                    .json(error(res.statusCode, "USER email does not exists!"));
        }

        if(!user.authenticate(password)){
            return res
                    .status(401)
                    .json(error(res.statusCode, "Email and password do not match!"));
        }

        // Create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

        // Put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        // Send response to front-end
        const { _id, name, email, role } = user;
        return res
                .status(200)
                .json(success(res.statusCode, "Sign in success", {
                    token,
                    user: { _id, name, email, role}
                }));
    });

};

exports.signout = (req, res) => {
    res.clearCookie("token");
    return res
            .status(200)
            .json(success(res.statusCode, "User signout success!", {}))
};