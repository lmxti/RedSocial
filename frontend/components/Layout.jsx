import Head from "next/head";

/*<----------- Estilos -----------> */
import styles from "../styles/Layout.module.css";
/*<----------- Componentes -----------> */
import NavBar from "./NavBar";

export default function Layout({ children, title = "Titulo default | Layout", description = "Descripcion default | Layout", navbar= false}) {


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      { navbar && <NavBar/>}
      
      

      <main className={styles.container}>{children}</main>
    </div>
  );
}
