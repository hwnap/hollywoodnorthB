const User = require('../model/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { EMPLOYEE_SECRET_CODE, MANAGER_SECRET_CODE } = config;

exports.addUser = async (req, res) => {
    try {
        const { username, password, secretCode } = req.body;
        let role = 'customer'; // Default role

        if (secretCode) {
            if (secretCode === EMPLOYEE_SECRET_CODE) {
                role = 'employee';
            } else if (secretCode === MANAGER_SECRET_CODE) {
                role = 'manager';
            }
        }

        const user = new User({ username, password, role });
        await user.save();

        res.status(201).send({ message: 'User added successfully', userId: user._id });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        // Token generation
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '20m' }
        );

        // Include the role in the response sent to the frontend
        res.status(200).send({ message: 'Login successful', token, role: user.role });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({ username: user.username, role: user.role });
    } catch (err) {
        res.status(400).send(err.message);
    }
};
