import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(api.getToken());
  const [loading, setLoading] = useState(true);

  // Restore session on mount if token exists
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = api.getToken();
      if (savedToken) {
        try {
          const data = await api.getMe();
          setUser(data.user);
          setTokenState(savedToken);
        } catch {
          // Token is invalid/expired — clear it
          api.removeToken();
          setTokenState(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    api.setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    api.setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    api.removeToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
