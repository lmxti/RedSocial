import styles from "@/styles/components/Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
