'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useNavigate

  // Handle form submission and login logic
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload on form submission

    setLoading(true); // Set loading to true while the API call is in progress
    setError(null); // Reset any previous error messages

    try {
      // Make a POST request to the backend API (Strapi or your custom API)
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,  // The email or username (e.g., user@example.com)
          password     // The password entered by the user
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json(); // Parse the JSON response

      if (data.jwt) {
        // Save the JWT token in localStorage (or another secure storage method)
        localStorage.setItem('jwtToken', data.jwt);
        console.log('JWT Token:', data.jwt);

        // Redirect to the payment-method page using React Router
        router.push('/payment-method'); // This will redirect without reloading the page
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      // Catch and display any errors (e.g., network issues or wrong credentials)
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        {/* Form for user input */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-600">
              Email/Username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)} // Update identifier on change
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password on change
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Error message (if any) */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Optional message after login (e.g., for debugging) */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            You can also check your localStorage by opening developer tools and typing:
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
