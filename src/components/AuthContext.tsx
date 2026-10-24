import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Use your existing API_URL constant/import here.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type User = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_username: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  isInitializing: boolean;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  apiFetch: (path: string, options?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Share one refresh request across concurrent API calls.
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  const setAuth = useCallback((token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          clearAuth();
          return;
        }

        const data: {
          accessToken: string;
          user: User;
        } = await response.json();

        if (!data.accessToken || !data.user) {
          clearAuth();
          return;
        }

        setAuth(data.accessToken, data.user);
      } catch (error) {
        console.error("Failed to restore session:", error);
        clearAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    void initializeAuth();
  }, [clearAuth, setAuth]);

  // Request a new access token using the HTTP-only refresh cookie.
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    if (refreshPromise.current) {
      return refreshPromise.current;
    }

    const request = (async (): Promise<string | null> => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          clearAuth();
          return null;
        }

        const data: { accessToken?: string } = await response.json();

        if (!data.accessToken) {
          clearAuth();
          return null;
        }

        setAccessToken(data.accessToken);
        return data.accessToken;
      } catch (error) {
        console.error("Token refresh failed:", error);
        clearAuth();
        return null;
      }
    })();

    refreshPromise.current = request;

    try {
      return await request;
    } finally {
      if (refreshPromise.current === request) {
        refreshPromise.current = null;
      }
    }
  }, [clearAuth]);

  // Make authenticated requests and retry once after refreshing.
  const apiFetch = useCallback(
    async (path: string, options: RequestInit = {}): Promise<Response> => {
      const url = path.startsWith("http")
        ? path
        : `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

      const sendRequest = (token: string | null) => {
        const headers = new Headers(options.headers);

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        } else {
          headers.delete("Authorization");
        }

        return fetch(url, {
          ...options,
          headers,
          credentials: "include",
        });
      };

      // First attempt
      let response = await sendRequest(accessToken);

      if (response.status !== 401) {
        return response;
      }

      // Refresh the expired access token.
      const newToken = await refreshAccessToken();

      if (!newToken) {
        return response;
      }

      // Retry the original request exactly once.
      response = await sendRequest(newToken);

      if (response.status === 401) {
        clearAuth();
      }

      return response;
    },
    [accessToken, refreshAccessToken, clearAuth],
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isInitializing,
        setAuth,
        clearAuth,
        apiFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
