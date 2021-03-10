import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        // check if database has a user w/ matching email as request
        const existingUser = await User.findOne({ email });
        // if not in db, return error
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        // else check password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        // if password is incorrect, return error
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentails." });

        // create token w/ email and id, second argument is 'secret string'
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const signup = async(req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        // check if database already has a user w/ same email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });
        // check if password matches confirmed password
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });
        
        // hash password, second argument is number of salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}