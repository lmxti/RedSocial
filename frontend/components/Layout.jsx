import Head from "next/head";
import styles from "../styles/Layout.module.css";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Layout({
  children,
  title = "Titulo default",
  description = "Descripcion default",
  navbar = false,
  rightComponent = null,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {navbar && <NavBar />}

      <main className={styles.container}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.mainContent}>{children}</div>

        <div className={styles.rightSection}>
          {rightComponent}
        </div>
      </main>
    </>
  );
}
