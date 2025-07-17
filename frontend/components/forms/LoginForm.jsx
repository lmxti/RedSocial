/* <----------------------- MODULOS --------------------------> */
import { useState } from "react";
import { useRouter } from 'next/router';

/* <----------------------- ESTILOS --------------------------> */
import styles from "@/styles/components/LoginForm.module.css";


/* <----------------------- SERVICIOS--------------------------> */
import { login } from "@/services/auth.service.js";


/* <----------------------- CONTEXTO  --------------------------> */
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const { login: setUserInContext } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) =>{
    e.preventDefault();    
    try {
      const userData = await login(credentials); 
      if (userData) {
        setUserInContext(userData); 
        router.push("/");
      }
    } catch (error) {
      console.log("[ERROR]: Error al realizar peticion para iniciar sesion: ", error);
      
    }
  }

  return (
    <div className={styles["container"]}>
      <form onSubmit={onSubmit} className={`${styles.formContent}`}>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" placeholder="Nombre de usuario" id="username" name="username" value={credentials.username} onChange={handleChange} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" placeholder="*******" id="password" name="password" value={credentials.password} onChange={handleChange} />

        <button className={styles["oauthButton"]}>
          Iniciar sesión
          <svg
            className={styles["icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 17 5-5-5-5"></path>
            <path d="m13 17 5-5-5-5"></path>
          </svg>
        </button>
        <button className={styles["oauthButton"]}>
          <svg className={styles["icon"]} viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
          </svg>
          Continue with Google
        </button>

        <div className={styles["separator"]}>
          <div></div>
          <span>O</span>
          <div></div>
        </div>
        <p className={styles["registerLink"]}>
          ¿No tienes cuenta?
          <a>Registrate</a>
        </p>
      </form>
    </div>
  );
}
