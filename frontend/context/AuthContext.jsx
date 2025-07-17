// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logout as logoutService } from "@/services/auth.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const isAuthenticated = !!user;

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Nueva función logout
  const handleLogout = async () => {
    await logoutService(); // elimina token y user
    router.push("/"); // redirige al login
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout: handleLogout, isLoading, login }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
