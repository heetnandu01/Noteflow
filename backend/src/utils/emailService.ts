import nodemailer from 'nodemailer';

const sendOTP = async (email: string, otp: string, purpose: 'signup' | 'signin') => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const subject = purpose === 'signup' ? 'Welcome to NoteFlow - Verify Your Email' : 'NoteFlow Sign In Verification';
    const heading = purpose === 'signup' ? 'Welcome to NoteFlow!' : 'Sign In Verification';

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `
        <h2>${heading}</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email error:', error);
    throw new Error('Failed to send OTP');
  }
};

export default { sendOTP };