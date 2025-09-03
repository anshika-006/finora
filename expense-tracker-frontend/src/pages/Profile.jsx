import React, { useState, useEffect } from 'react';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import { getProfile, updateProfile, loginUser } from '../api';
import { Pencil, User2Icon } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordVerified, setOldPasswordVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError('');
      try {
        const data = await getProfile(token);
        setUsername(data.username || '');
        setName(data.name || '');
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchProfile();
  }, [token]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateProfile(token, { username, name });
      setSuccess('Name updated successfully!');
      setEditingName(false);
    } catch (err) {
      setError('Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOldPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await loginUser({ username, password: oldPassword });
      setOldPasswordVerified(true);
      setSuccess('Old password verified. You can now set a new password.');
    } catch (err) {
      setError('Old password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateProfile(token, { username, password: newPassword });
      setSuccess('Password updated successfully!');
      setShowPasswordUpdate(false);
      setOldPassword('');
      setNewPassword('');
      setOldPasswordVerified(false);
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your personal information and preferences.</p>
        <div className="flex flex-col items-center mb-6">
          <div className="w-40 h-40 rounded-full bg-slate-700 flex items-center justify-center mb-4">
            <User2Icon className="w-32 h-32 text-gray-300" />
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</span>
            <div className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white select-text">
              {username}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</span>
            {!editingName && (
              <button type="button" onClick={() => setEditingName(true)} className="ml-2 p-1 rounded hover:bg-slate-700/50">
                <Pencil className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          {!editingName ? (
            <div className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white select-text">
              {name}
            </div>
          ) : (
            <form onSubmit={handleUpdateName} className="flex items-center gap-2 mt-2">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-auto flex-1"
              />
              <Button type="submit" disabled={loading}>
                Save
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditingName(false)} disabled={loading}>
                Cancel
              </Button>
            </form>
          )}
        </div>
        <div className="mb-6">
          {!showPasswordUpdate && (
            <Button type="button" onClick={() => setShowPasswordUpdate(true)}>
              Update Password
            </Button>
          )}
          {showPasswordUpdate && !oldPasswordVerified && (
            <form onSubmit={handleVerifyOldPassword} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Old Password</label>
                <Input
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </form>
          )}
          {showPasswordUpdate && oldPasswordVerified && (
            <form onSubmit={handleUpdatePassword} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </form>
          )}
        </div>
        {(error || success) && (
          <div className="mt-4">
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
            {success && <div className="text-green-500 text-sm font-medium">{success}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
