import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { AlertTriangle } from 'lucide-react';

const Error = () => {
  const navigate = useNavigate();

  return (
    <section id="main" className='section1'>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
      >
        Go to Homepage
      </button>
    </div>
    </section>
  );
};

export default Error;
