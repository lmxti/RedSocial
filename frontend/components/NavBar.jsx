import React from "react";

/*<----------- Componentes -----------> */
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";


/*<----------- Estilos -----------> */
import styles from '@/styles/components/NavBar.module.css'


/*<----------- Context -----------> */
import { useTheme } from "@/context/ThemeContext";

export default function NavBar() {

  const { isDarkMode } = useTheme(); 

  return (
    <>
      <nav className={`${styles.navbarContainer}`}>
        <div className={`${ styles.navbarContent }`}>
          {/* LeftSide (Logo - Buscador) */}
          {/* <div className={`${styles.leftSide}`}>
            <a href="#">
              <img src="favicon.ico" alt="Logo" />
            </a>
            <div >
              <i></i>
              <input  type="text" placeholder="Buscar en plataforma"
              />
            </div>
          </div> */}

            {/* RightSide (Enlaces de navegación) */}
            <ul className={`${styles.rightSide}`}>
                {/* Enlace de navegacion 1 */}
                <li> <Link href="/home">Inicio</Link></li>
                {/* Enlace de navegacion 2 */}
                <li> <Link href="/">Enlace 2</Link></li>
                {/* Enlace de navegacion 4 */}
                <li> <Link href="/about">About</Link></li>
            </ul>
            <ThemeToggle/>
        </div>
      </nav>
    </>
  );
}
