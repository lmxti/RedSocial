import React from "react";
import styles from "@/styles/components/SideBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function SideBar() {
  const router = useRouter();
  const { logout, user } = useAuth();
  return (
    <nav className={`${styles.nav}`}>
      <Link
        href="/home"
        className={`${styles.link} ${
          router.pathname === "/home" ? styles.active : ""
        }`}
      >
        <svg
          className="mr-4 h-6 w-6 "
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
          ></path>
        </svg>
        <p>Inicio</p>
      </Link>
      <Link
        href="/explore"
        className={`${styles.link} ${
          router.pathname === "/explore" ? styles.active : ""
        }`}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
        </svg>
        <p>Explorar</p>
      </Link>
      <Link
        href="/notifications"
        className={`${styles.link} ${
          router.pathname === "/notifications" ? styles.active : ""
        }`}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <p>Notificaciones</p>
      </Link>
      <Link
        href="/messages"
        className={`${styles.link} ${
          router.pathname === "/messages" ? styles.active : ""
        }`}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <p>Mensajes</p>
      </Link>
      <Link
        href="/bookmarks"
        className={`${styles.link} ${
          router.pathname === "/bookmarks" ? styles.active : ""
        }`}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>

        <p>Guardados</p>
      </Link>

      <Link
        href={`/profile/${user?.id}`}
        className={`${styles.link} ${
          router.pathname === "/profile" ? styles.active : ""
        }`}
      >
        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <p>Perfil</p>
      </Link>
      
      <button onClick={logout} className={`${styles.link} ${styles.logoutButton}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m2 12l5 4v-3h9v-2H7V8z" />
          <path
            fill="currentColor"
            d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051s2.051 3.08 2.051 4.95s-.729 3.628-2.051 4.95s-3.08 2.051-4.95 2.051s-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"
          />
        </svg>
        <p>Cerrar sesión</p>
      </button>

    </nav>
  );
}
