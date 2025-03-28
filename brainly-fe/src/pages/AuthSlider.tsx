import React, { useState, useEffect } from 'react';

interface AuthSliderProps {
  initialView: boolean;
}

export const AuthSlider: React.FC<AuthSliderProps> = ({ initialView }) => {
  const [isLoginActive, setIsLoginActive] = useState(initialView);

  useEffect(() => {
    setIsLoginActive(initialView);
  }, [initialView]);

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(`/api/v1/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Success:', data);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full bg-white">
      <div 
        className={`flex transition-transform duration-300 ease-in-out ${
          isLoginActive ? 'translate-x-0' : '-translate-x-1/2'
        }`}
        style={{ width: '200%' }}
      >
        {/* Login Form */}
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Welcome Back
          </h2>
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'signin')}>
            <div>
              <input
                type="text"
                name="userName"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLoginActive(false)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Need an account? Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Signup Form */}
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Create Account
          </h2>
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'signup')}>
            <div>
              <input
                type="text"
                name="userName"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLoginActive(true)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Sign In
              </button>