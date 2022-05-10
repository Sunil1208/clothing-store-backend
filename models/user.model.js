const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true});

UserSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

UserSchema.virtual("fullName")
    .get(function() {
        return `${this.name} ${this.lastname}`
    })

UserSchema.methods = {
    securePassword: function(plainPassword) {
        if(!plainPassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
               .update(plainPassword)
               .digest('hex');
        } catch (error) {
            return "";
        }
    },
    authenticate: function(plainPassword) {
        this.securePassword(plainPassword) === this.encry_password;
    }
};

module.exports = mongoose.model("User", UserSchema);