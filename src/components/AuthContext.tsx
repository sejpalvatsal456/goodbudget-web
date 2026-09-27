import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_username: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User|null>(null);
  
  const setAuth = (accessToken: string, user: User) => {
    setUser(user);
    setAccessToken(accessToken);
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{accessToken, user, setAuth, clearAuth}}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};