const asyncHandler = require("express-async-handler");
const {User , validateLogin, validateNewUser} = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Login user
 * @route POST /api/users/login
 * @access Public
 */

const login = asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin }, process.env.TOKEN_SECRET , { expiresIn: "3d" });
    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).send({ ...userWithoutPassword, token });
});

/**
 * @desc Register user
 * @route POST /api/users/register
 * @access Public
 */

const register = asyncHandler(async (req, res) => {
    const { error } = validateNewUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    }).save();
    res.status(200).send({ message: "User created successfully." });
}) 


/**
 * @desc get All users
 * @route GET /api/users
 * @access Private
 */

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().populate('taskes');
    res.status(200).json(users);
});

/**
 * @desc delete user by id
 * @route DELETE /api/users/:id
 * @access Private
 */

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send("User not found.");
    }   
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully.");
});

// Export
module.exports = {
    login,
    register,
    getAllUsers,
    // getUserById,
    deleteUserById
};