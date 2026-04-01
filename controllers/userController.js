// const { findOne } = require('../models/userModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    try {
        const { name, password, email, role, phone } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'User with email already exists' });
        }

        // Check existing phone
        if (phone) {
            const existingPhone = await User.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({ message: 'User with same phone number already exists' });
            }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Prevent unauthorized admin creation
        const userRole = role === 'admin' ? 'salesperson' : role;

        const user = await User.create({
            name,
            password: passwordHash,
            email,
            role: userRole,
            phone
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};