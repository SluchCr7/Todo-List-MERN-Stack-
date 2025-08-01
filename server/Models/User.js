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
    },
    profilePhoto:{
        type : Object, 
        default:{
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId : null
        }
    },
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject : {virtuals: true}
});

userSchema.virtual("tasks", {
    ref: "Note",
    localField: "_id",
    foreignField: "userId"
})

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