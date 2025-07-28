const mongooese = require("mongoose");
const joi = require("joi");

const userSchema = new mongooese.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerify : {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
});

const User = mongooese.model("User", userSchema);

const validateNewUser = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(user);
};

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = {
    User,
    validateNewUser,
    validateLogin,
};