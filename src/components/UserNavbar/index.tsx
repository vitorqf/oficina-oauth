import { useAuth } from "@/hooks/useAuth";
import {
  AccountCircle,
  ExitToApp,
  KeyboardArrowDown,
  Person,
} from "@mui/icons-material";
import Image from "next/image";
import styles from "./UserNavbar.module.scss";

export function UserNavbar() {
  const { user, isLoading, signOut } = useAuth();

  return (
    <details className={styles["user-navbar"]}>
      <summary>
        {!user || isLoading ? (
          <AccountCircle sx={{ fontSize: 32, color: "#0f6" }} />
        ) : (
          <Image src={user.avatarUrl} alt={user.name} width={32} height={32} />
        )}
        <strong>{!user || isLoading ? "Usuário" : user.name}</strong>
        <KeyboardArrowDown sx={{ fontSize: 18 }} />
      </summary>

      <ul>
        <li>
          <Person sx={{ fontSize: 20 }} />
          Perfil
        </li>
        <li onClick={signOut}>
          <ExitToApp sx={{ fontSize: 20 }} />
          Sair
        </li>
      </ul>
    </details>
  );
}
