import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { PATHS } from '../../consts/Paths';
import { useAuth } from '../../hooks/useAuth';
import LoginFormDialog from '../LoginFormDialog/LoginFormDialog';
import { useState } from 'react';

const Header = () => {
    const { isLoggedIn } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <p className={styles.logo}>Portfolio</p>
            <LoginFormDialog open={open} dismiss={() => setOpen(false)}/>
             <nav className={styles.nav}>
                {isLoggedIn ? (
                    <>
                        <Link to={PATHS.BLOG_POST}>새 블로그 글</Link>
                        <Link to={PATHS.PROJECT_POST}>새 프로젝트 글</Link>
                        <button onClick={() => {}}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setOpen(true)}>로그인</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;