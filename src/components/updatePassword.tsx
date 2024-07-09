import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import '../styles/updatePasswordForm.scss';

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!oldPassword) {
      newErrors.oldPassword = 'Old Password is required';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'New Password must be at least 8 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission logic here
      console.log('Form submitted', { oldPassword, newPassword, confirmPassword });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center box-container">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md lg:max-w-lg box">
        <div className="flex items-center justify-center mb-6">
          <img src="/images/logo.png" alt="GeekMart Logo" className="h-14 mr-4" />
          <h2 className="text-2xl font-semibold text-gray-700">Update Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={toggleOldPasswordVisibility}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showOldPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 btn"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
