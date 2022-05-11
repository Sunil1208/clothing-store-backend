const User = require("../models/user.model");
const { validationResult } = require("express-validator");

const { success, error, validation } = require("../utils/responseApi.utils");

exports.signout = (req, res) => {
    const response = getStandardResponse(200, "Sign up success", {});
    return res.json(response);
};

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