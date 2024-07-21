import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerify2FAMutation } from '../store/actions/user';
import { toast } from 'react-toastify';

const TwoFA: React.FC = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [verify2FA, { isLoading }] = useVerify2FAMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verify2FA({ code }).unwrap();
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to verify 2FA. Please check your code and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Two-Factor Authentication</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Enter 2FA Code</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFA;
