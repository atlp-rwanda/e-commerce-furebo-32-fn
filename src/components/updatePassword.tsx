import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useUpdatePasswordMutation } from '../store/actions/user'; // Assuming you've exported useUpdatePasswordMutation correctly
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/updatePasswordForm.scss';
import { getIdFromToken } from "../utils/decodeToken";
import CircularProgress from '@mui/material/CircularProgress';
import "../styles/updatePasswordForm.scss"
const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [updatePassword, { isLoading, isError, error }] = useUpdatePasswordMutation(); // Using the mutation hook

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const id = getIdFromToken();
      try {
        const response = await updatePassword({ id: `${id}`, oldPassword, newPassword}).unwrap(); // Call mutation
        toast.success(response.message);
        // Clear the input fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (err: any) {
        console.error(err.data.message);
        toast.error(err.data?.message || 'An error occurred. Please try again.');
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: err.data?.message || 'An error occurred. Please try again.',
        }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md lg:max-w-lg">
        <div className="flex items-center justify-center mb-6">
          <img src="/images/logo.png" alt="GeekMart Logo" className="h-20 mr-4" />
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-full w-10 flex items-center justify-center"
              >
                {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-full w-10 flex items-center justify-center"
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-full w-10 flex items-center justify-center"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          {errors.serverError && <p className="text-red-500 text-sm mt-1 p-2">{errors.serverError}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 rst-btn"
          >
            {isLoading ? <CircularProgress size={24} className="mr-2" style={{ color: '#fff' }}/> : null}
            Reset Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
