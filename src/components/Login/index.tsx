import { useAuth } from "@/hooks/useAuth";
import { Email, GitHub } from "@mui/icons-material";
import Image from "next/image";
import styles from "./Login.module.scss";
import Logo from "/public/assets/logo.svg";

export function Login() {
  const { signIn } = useAuth();

  return (
    <div className={styles.login}>
      <div className={styles.login__main}>
        <h1 className={styles.login__main__logo}>
          <Image src={Logo} alt="logo" fill />
        </h1>
        <p className={styles.login__main__title}>Seja bem-vindo.</p>

        <button className={styles.login__main__button}>
          <Email sx={{ fontSize: 20, lineHeight: 20 }} />
          Gmail
        </button>

        <button className={styles.login__main__button} onClick={signIn}>
          <GitHub sx={{ fontSize: 20, lineHeight: 20 }} />
          Github
        </button>
      </div>
    </div>
  );
}
