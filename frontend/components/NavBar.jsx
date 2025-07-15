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
          <div className={`${styles.item}`}>
            <a href="#">
              {/* <img src="favicon.ico" alt="Logo" /> */}
              <ThemeToggle/>
              <p>Red Social</p>

            </a>
          </div>

        </div>
      </nav>
    </>
  );
}
