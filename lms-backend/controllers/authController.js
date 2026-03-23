const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const pool = require('../config/db');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create(name, email, hashedPassword);
        const user = { id: userId, name, email };

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        await pool.execute(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
            [user.id, refreshTokenHash, expiresAt]
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
            // Decipher user from token to revoke in DB
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            await pool.execute(
                'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL',
                [decoded.id]
            );
        }
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found' });

        // Verify token in DB (simplified, ideally match specific hash)
        const [tokens] = await pool.execute(
            'SELECT * FROM refresh_tokens WHERE user_id = ? AND revoked_at IS NULL AND expires_at > NOW()',
            [user.id]
        );
        if (tokens.length === 0) return res.status(401).json({ message: 'Invalid or revoked refresh token' });

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
