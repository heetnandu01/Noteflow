import Express  from 'express';
import {
    verifySigninOTP,
    sendSigninOTP,
    logout,
    getProfile,
    sendSignupOTP,
    verifySignupOTP
} from '../controllers/authController.js';

const router = Express.Router();

router.post('/signup/send-otp',sendSignupOTP);
router.post('/signup/verify-otp',verifySignupOTP);
router.post('/signin/send-otp',sendSigninOTP);
router.post('/signin/verify-otp',verifySigninOTP);
router.post('/logout',logout);
router.post('/profile',getProfile);

export default router;








