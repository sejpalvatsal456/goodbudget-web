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
  statusCode: number | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  // Share one refresh request across startup and concurrent API calls.
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  const setAuth = useCallback((token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  // Uses the HTTP-only refresh cookie to get a new access token.
  // It never clears auth itself, so a late failure can't undo a fresh login;
  // callers decide what a failure means.
  const refreshSession = useCallback(async (): Promise<string | null> => {
    if (refreshPromise.current) return refreshPromise.current;

    const request = (async (): Promise<string | null> => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        setStatusCode(res.status);
        if (!res.ok) return null;

        const data: { accessToken?: string; user?: User } = await res.json();
        if (!data.accessToken) return null;

        setAccessToken(data.accessToken);
        if (data.user) setUser(data.user);
        return data.accessToken;
      } catch (error) {
        console.error("Token refresh failed:", error);
        return null;
      }
    })();

    refreshPromise.current = request;
    try {
      return await request;
    } finally {
      if (refreshPromise.current === request) refreshPromise.current = null;
    }
  }, []);

  // Restore the session on mount. Failure just means "not logged in".
  useEffect(() => {
    void refreshSession().finally(() => setIsInitializing(false));
  }, [refreshSession]);

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

        return fetch(url, { ...options, headers, credentials: "include" });
      };

      let response = await sendRequest(accessToken);
      if (response.status !== 401) return response;

      const newToken = await refreshSession();
      if (!newToken) {
        clearAuth();
        return response;
      }

      // Retry the original request exactly once.
      response = await sendRequest(newToken);
      if (response.status === 401) clearAuth();

      return response;
    },
    [accessToken, refreshSession, clearAuth],
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
        statusCode,
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