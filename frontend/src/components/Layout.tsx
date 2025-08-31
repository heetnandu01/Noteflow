import React from 'react';
import RightImage from '../assets/right.jpg'; 

interface LayoutProps {
  children: React.ReactNode;
  showWave?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showWave = true }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Wave background */}
      {showWave && (
        <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${RightImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;