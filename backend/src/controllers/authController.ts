import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import otpStore from '../utils/otpStore.js';
import emailService from '../utils/emailService.js';

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const sendSignupOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, dateOfBirth } = req.body;

    // Validate input
    if (!email || !fullName || !dateOfBirth) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address' });
      return;
    }

    // Validate date of birth
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 13 || age > 120) {
      res.status(400).json({ error: 'Age must be between 13 and 120 years' });
      return;
    }

    // Generate and store OTP
    const otp = otpStore.storeOTP(email.toLowerCase(), 'signup', { fullName, dateOfBirth });

    // Send OTP email
    await emailService.sendOTP(email, otp, 'signup');

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send signup OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifySignupOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ error: 'Email and OTP are required' });
      return;
    }

    // Verify OTP
    const otpResult = otpStore.verifyOTP(email.toLowerCase(), otp, 'signup');
    if (!otpResult.valid) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return;
    }

    // Create user
    const user = new User({
      fullName: otpResult.userData.fullName,
      email: email.toLowerCase(),
      dateOfBirth: new Date(otpResult.userData.dateOfBirth)
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user.id.toString());

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth
      }
    });
  } catch (error) {
    console.error('Verify signup OTP error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

export const sendSigninOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(400).json({ error: 'No account found with this email' });
      return;
    }

    // Generate and store OTP
    const otp = otpStore.storeOTP(email.toLowerCase(), 'signin');

    // Send OTP email
    await emailService.sendOTP(email, otp, 'signin');

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send signin OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifySigninOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ error: 'Email and OTP are required' });
      return;
    }

    // Verify OTP
    const otpResult = otpStore.verifyOTP(email.toLowerCase(), otp, 'signin');
    if (!otpResult.valid) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return;
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    // Generate JWT token
    const token = generateToken(user.id.toString());

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: 'Signed in successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth
      }
    });
  } catch (error) {
    console.error('Verify signin OTP error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get token from cookies first, then from Authorization header
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId).select('-__v');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};