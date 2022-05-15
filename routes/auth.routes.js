const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { signout, signup, signin, isSignedIn } = require("../controllers/auth.controller");

router.post("/signup", [
    check("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    check("lastname", "Last name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 5 characters").isLength({min: 5})
], signup);
router.get("/signout", signin);

router.post("/signin", [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 5 characters").isLength({min: 5})
], signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
    return res.json(req.auth);
})

module.exports = router;