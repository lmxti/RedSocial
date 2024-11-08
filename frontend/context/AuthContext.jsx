// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
}