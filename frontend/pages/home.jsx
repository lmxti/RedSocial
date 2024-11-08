import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";

import PostForm from "@/components/forms/PostForm";

export default function home() {
  return (
    <Layout title={"Inicio | NextJS"} description={"Descripcion Inicio"} navbar={true}>
    <div className={styles["container"]}>
        <div className={styles["content"]}>
            {/* LeftSide */}
            <div className={styles["leftSide"]}>
                <nav>
                <a href="#" className={styles['link']}>
                    <svg className="mr-4 h-6 w-6 " stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"></path>
                    </svg>
                    <p>Inicio</p>
                </a>
                <a href="#" className={styles["link"]}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                    </svg>
                    <p>Explorar</p>
                </a>
                <a href="#" className={styles["link"]}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                        </path>
                    </svg>
                    <p>Notificaciones</p>
                </a>
                <a href="#" className={styles["link"]}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                    <p>Mensajes</p>
                </a>
                <a href="#" className={styles["link"]}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                    <p>Guardados</p>
                </a>

                <a href="#" className={styles["link"]}>
                    <img src="/logout2.svg" alt="" />
                    <p>Cerrar sesión</p>
                </a>

                
                

                <a href="#" className={styles["link"]}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <p>Perfil</p>
                </a>
                </nav>
            </div>

            {/* CenterSide */}
            <div className={styles["centerSide"]}>
                {/* Edicion publicacion */}
                <div>
                    <PostForm/>
                </div>
                {/* Visor de publicaciones */}
                <div>
                    <h2>Listado de publicaciones</h2>
                </div>

            </div>

            {/* RightSide */}
            <div className={styles["rightSide"]}>
                <h1>Temas de interes</h1>
                <h1>Widtgets</h1>

            </div>
        </div>
    </div>
    </Layout>
  );
}
