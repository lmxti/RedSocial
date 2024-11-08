import { useTheme } from "@/context/ThemeContext";
import styles from "@/styles/components/ThemeToggle.module.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <label
      htmlFor="themeToggle"
      className={`${styles['themeToggle']} ${styles['st-sunMoonThemeToggleBtn']}`}
    >
      <input onClick={toggleDarkMode} type="checkbox" id="themeToggle" className={styles['themeToggleInput']}/>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" stroke="none"
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle className={styles['sunMoon']} cx="10" cy="10" r="8" mask="url(#moon-mask)"></circle>
        <g>
          <circle className={`${styles['sunRay']} ${styles['sunRay1']}`} cx="18" cy="10" r="1.5"></circle>
          <circle className={`${styles['sunRay']} ${styles['sunRay2']}`} cx="14" cy="16.928" r="1.5"></circle>
          <circle className={`${styles['sunRay']} ${styles['sunRay3']}`} cx="6" cy="16.928" r="1.5"></circle>
          <circle className={`${styles['sunRay']} ${styles['sunRay4']}`} cx="2" cy="10" r="1.5"></circle>
          <circle className={`${styles['sunRay']} ${styles['sunRay5']}`} cx="6" cy="3.1718" r="1.5"></circle>
          <circle className={`${styles['sunRay']} ${styles['sunRay6']}`} cx="14" cy="3.1718" r="1.5"></circle>
        </g>
      </svg>
    </label>
  );
};

export default ThemeToggle;
