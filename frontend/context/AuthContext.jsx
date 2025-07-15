// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { logout as logoutService } from '@/services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const router = useRouter();
    const [redirected, setRedirected] = useState(false);

    // Obtener el usuario desde localStorage (solo en cliente)
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || null : null;
    const isAuthenticated = !!user; // Si hay usuario, está autenticado

    useEffect(() => {
        // Si no está autenticado, redirigir a la página de autenticación
        if (!isAuthenticated && !redirected) {
            router.push('/');
            setRedirected(true);
        }
        // Si esta autenticado he intenta ir a la pagina que contiene formulario de inicio de sesion.
        if (isAuthenticated && router.pathname === "/") {
            router.push("/home");
        }
    }, [isAuthenticated, redirected, router]);

    // Nueva función logout
    const handleLogout = () => {
        logoutService(); // elimina token y user
        router.push('/'); // redirige al login
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}