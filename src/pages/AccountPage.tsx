import React, { useState, useEffect } from 'react';
import './AccountPage.css';
import { useAccount, AdminSection } from '../contexts/AccountContext';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, login, logout, signup, forgotPassword, deleteAccount, googleSignIn } = useAccount();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const success = await signup(email, password);
    if (success) {
      setShowSignupModal(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      alert('Signup failed. Please try again.');
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      alert('Password reset instructions sent to your email.');
      setShowForgotPasswordModal(false);
      setEmail('');
    } else {
      alert('Forgot password request failed.');
    }
  };

  const handleDeleteAccountConfirm = async () => {
    const success = await deleteAccount();
    if (success) {
      alert('Your account has been deleted.');
      setShowDeleteAccountModal(false);
    } else {
      alert('Account deletion failed.');
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
    setShowLoginModal(false);
    setShowSignupModal(false);
  };


  return (
    <div className="account-page">
      <h1>My Account</h1>

      {!isAuthenticated ? (
        <div className="auth-options">
          <p>You are not logged in.</p>
          <button onClick={() => setShowLoginModal(true)}>Login</button>
          <button onClick={() => setShowSignupModal(true)}>Sign Up</button>
          <button onClick={handleGoogleSignIn}>Login with Google</button>
        </div>
      ) : (
        <div className="user-info">
          <p>Welcome, {user?.email}!</p>
          <button onClick={() => setShowDeleteAccountModal(true)} className="delete-button">Delete Account</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowLoginModal(false)}>Cancel</button>
            </form>
            <button type="button" onClick={() => { setShowLoginModal(false); setShowForgotPasswordModal(true); }}>Forgot Password?</button>
            <button type="button" onClick={handleGoogleSignIn}>Login with Google</button>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </label>
              <button type="submit">Sign Up</button>
              <button type="button" onClick={() => setShowSignupModal(false)}>Cancel</button>
            </form>
            <button type="button" onClick={handleGoogleSignIn}>Sign Up with Google</button>
          </div>
        </div>
      )}

      {showForgotPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <button type="submit">Reset Password</button>
              <button type="button" onClick={() => setShowForgotPasswordModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteAccountModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleDeleteAccountConfirm}>Yes, Delete My Account</button>
            <button onClick={() => setShowDeleteAccountModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <AdminSection>
        <p>This content is only visible to admin users.</p>
      </AdminSection>
    </div>
  );
};

export default AccountPage;
