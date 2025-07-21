/*<------------------------------ LAYOUT ------------------------------>*/
import Layout from "@/components/Layout";
/*<---------------------------- COMPONENTES ---------------------------->*/
import LoginForm from "@/components/forms/LoginForm";
import ThemeToggle from "@/components/ThemeToggle";
/*<------------------------------ ESTILOS ------------------------------>*/
import styles from "@/styles/Index.module.css";
/*<------------------------------- HOOKS ------------------------------->*/


export default function Home() {
  return (
      <div className={styles.container}>

        <div className={styles.content}>
          {/* <-----------------  LeftSide section ----------------> */}
          <div className={styles["LeftSide"]}>
            <div className={styles["LeftSide__logo"]}>
              <ThemeToggle /> <h1>Red Social</h1>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autvoluptatum dicta eos nulla odio fuga? Veritatis</p>
          </div>

          {/* <----------------- RightSide section ----------------> */}
          <div className={styles["RightSide"]}>
            <LoginForm />
          </div>
        </div>

      </div>
  );
}
