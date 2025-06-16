import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'client' | 'signin' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    caseDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { loginType, formData });
  };

  if (!loginType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/" className="flex justify-center">
              <h1 className="text-3xl font-bold text-blue-900">Legal Estate</h1>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please choose how you'd like to proceed
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => setLoginType('client')}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Prospective Client
              </div>
            </button>

            <button
              onClick={() => setLoginType('signin')}
              className="group relative w-full flex justify-center py-4 px-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sign In
              </div>
            </button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-blue-900">Legal Estate</h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {loginType === 'client' ? 'New Client Inquiry' : 'Sign In'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {loginType === 'client' 
              ? 'Tell us about your case and we\'ll get back to you shortly'
              : 'Access your Legal Estate account'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {loginType === 'client' ? (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="caseDescription" className="block text-sm font-medium text-gray-700">
                    Brief Case Description *
                  </label>
                  <textarea
                    id="caseDescription"
                    name="caseDescription"
                    rows={4}
                    required
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Please describe your legal matter briefly..."
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </>
            )}
          </div>

          {loginType === 'signin' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {loginType === 'client' ? 'Submit Inquiry' : 'Sign In'}
            </button>
          </div>

          {loginType === 'client' && (
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By submitting this form, you agree to our privacy policy and terms of service. 
                We will contact you within 24 hours to discuss your case.
              </p>
            </div>
          )}

          {loginType === 'signin' && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Contact us for access
                </a>
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setLoginType(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to options
            </button>
            <span className="text-gray-300">|</span>
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;