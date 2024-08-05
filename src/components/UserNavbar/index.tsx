import { KeyboardArrowDown, AccountCircle, ExitToApp, Person } from '@mui/icons-material';
import styles from './UserNavbar.module.scss'

export function UserNavbar() {
    return <details className={styles['user-navbar']}>
        <summary>
            <AccountCircle sx={{ fontSize: 32, color: '#0f6' }} />
            <strong>Yasmin</strong>
            <KeyboardArrowDown sx={{ fontSize: 18 }} />
        </summary>

        <ul>
            <li>
                <Person sx={{ fontSize: 20 }}/>
                Perfil
            </li>
            <li>
                <ExitToApp sx={{ fontSize: 20}}/> 
                Sair
            </li>
        </ul>

    </details>
}