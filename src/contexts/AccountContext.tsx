import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a User type
interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  // Add other user properties as needed
}

// Define the shape of our AccountContext
interface AccountContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  googleSignIn: () => Promise<void>; // Placeholder for Google Sign-In
  forgotPassword: (email: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

// Create the context with a default undefined value
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Define AccountProvider props
interface AccountProviderProps {
  children: ReactNode;
}

// Admin users list (for demonstration purposes)
const ADMIN_USERS: string[] = [
  'admin@example.com', // Default admin user
  // Add other admin emails here or load from environment variables if available
  ...((import.meta as any).env.ADMIN_USERS ? (import.meta as any).env.ADMIN_USERS.split('\n').filter((email: string) => email.trim() !== '') : []),
];

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(ADMIN_USERS.includes(parsedUser.email));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call for login
    console.log('Attempting login with:', email, password);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // For demonstration: simple in-memory check or mock user
    const mockUser: User = { id: '123', email: 'test@example.com', isAdmin: false };
    const adminUser: User = { id: '456', email: 'admin@example.com', isAdmin: true };

    if (email === mockUser.email && password === 'password123') {
      const currentUser = { ...mockUser, isAdmin: ADMIN_USERS.includes(email) };
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAdmin(currentUser.isAdmin);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    } else if (email === adminUser.email && password === 'admin123') {
      const currentUser = { ...adminUser, isAdmin: ADMIN_USERS.includes(email) };
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAdmin(currentUser.isAdmin);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call for signup
    console.log('Attempting signup with:', email, password);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // For demonstration: always successful signup, then auto-login
    const newUser: User = { id: Date.now().toString(), email, isAdmin: ADMIN_USERS.includes(email) };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAdmin(newUser.isAdmin);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
  };

  const googleSignIn = async () => {
    console.log('Google Sign-In initiated (placeholder)');
    // In a real app, you would integrate with Firebase Auth or similar
    // For demonstration, let's just mock a successful Google sign-in
    await new Promise(resolve => setTimeout(resolve, 1000));
    const googleUser: User = { id: 'google-123', email: 'google@example.com', isAdmin: false };
    setUser(googleUser);
    setIsAuthenticated(true);
    setIsAdmin(ADMIN_USERS.includes(googleUser.email));
    localStorage.setItem('currentUser', JSON.stringify(googleUser));
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    console.log('Forgot password request for:', email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would send an email with a reset link
    console.log(`Password reset link sent to ${email} (simulated)`);
    return true;
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) {
      console.warn('No user logged in to delete.');
      return false;
    }
    console.log('Deleting account for:', user.email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    logout(); // Log out after successful deletion
    console.log('Account deleted successfully (simulated)');
    return true;
  };

  return (
    <AccountContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      signup,
      logout,
      googleSignIn,
      forgotPassword,
      deleteAccount,
    }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the AccountContext
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

// Placeholder Admin Section Component (can be moved to a separate file later)
export const AdminSection: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAdmin } = useAccount();

  if (!isAdmin) {
    return null;
  }

  return (
    <div style={{ border: '1px dashed red', padding: '10px', margin: '20px 0' }}>
      <h3>Admin Section (Visible to Admins Only)</h3>
      {children}
    </div>
  );
};