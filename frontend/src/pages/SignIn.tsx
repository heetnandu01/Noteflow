import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface FormData {
  email: string;
  otp: string;
}

interface FormErrors {
  email?: string;
  otp?: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    otp: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (otpSent && !formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authAPI.sendSigninOtp({ email: formData.email });
      
      setOtpSent(true);
      toast.success('OTP sent successfully! Check your email.');
    } catch (error: any) {
      let errorMessage = 'Failed to send OTP';
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast.error(errorMessage);
      setErrors({ email: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authAPI.verifySigninOtp(formData);
      
      login(response.data.user);
      toast.success('Signed in successfully!');
      
      // Navigate to the page user was trying to access, or dashboard by default
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      let errorMessage = 'Invalid OTP';
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast.error(errorMessage);
      setErrors({ otp: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await authAPI.sendSigninOtp({ email: formData.email });
      toast.success('OTP resent successfully!');
    } catch (error: any) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>

       <div className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 z-50">
        
          <svg
            width="79"
            height="32"
            viewBox="0 0 79 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
              fill="#367AFF"
            />
            <path
              d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z"
              fill="#367AFF"
            />
            <path
              d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z"
              fill="#367AFF"
            />
            <path
              d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z"
              fill="#367AFF"
            />
            <path
              d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z"
              fill="#367AFF"
            />
            <path
              d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z"
              fill="#367AFF"
            />
            <path
              d="M46.0766 25V7.54544H49.2385V14.9346H57.3266V7.54544H60.497V25H57.3266V17.5852H49.2385V25H46.0766ZM68.8907 25H62.976V7.54544H69.0101C70.743 7.54544 72.2316 7.89487 73.476 8.59374C74.726 9.28692 75.6862 10.2841 76.3566 11.5852C77.0271 12.8864 77.3623 14.4432 77.3623 16.2557C77.3623 18.0739 77.0243 19.6364 76.3481 20.9432C75.6777 22.25 74.7089 23.2528 73.4419 23.9517C72.1805 24.6506 70.6635 25 68.8907 25ZM66.1379 22.2642H68.7373C69.9532 22.2642 70.9674 22.0426 71.7799 21.5994C72.5924 21.1506 73.2032 20.4829 73.6123 19.5966C74.0214 18.7045 74.226 17.5909 74.226 16.2557C74.226 14.9204 74.0214 13.8125 73.6123 12.9318C73.2032 12.0454 72.5981 11.3835 71.797 10.946C71.0015 10.5028 70.0129 10.2812 68.8311 10.2812H66.1379V22.2642Z"
              fill="#232323"
            />
          
        </svg>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
           
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-600">Please login to continue to your account.</p>
        </div>

        <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="jones.karmad@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            icon={<Mail className="w-5 h-5" />}
            disabled={otpSent}
          />

          {otpSent && (
            <>
              <div className="text-center text-sm text-gray-600 mb-4">
                We've sent a verification code to <strong>{formData.email}</strong>
              </div>
              
              <Input
                label="OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
                error={errors.otp}
                maxLength={6}
              />
              
              <div className="flex items-center">
                <input
                  id="keep-logged-in"
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-700">
                  Keep me logged in
                </label>
              </div>
            </>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            {otpSent ? 'Sign in' : 'Send OTP'}
          </Button>

          {otpSent && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Need an account? Create one
              </button>
            </div>
          )}

          <div className="text-center">
            <span className="text-gray-600">Need an account? </span>
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;