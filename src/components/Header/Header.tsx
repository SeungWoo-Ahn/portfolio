import { Link } from 'react-router-dom';
import { PATHS } from '../../consts/Paths';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
    const { isLoggedIn } = useAuth();

    return (
        <header className={styles.header}>
            <p className={styles.logo}>SEUNGWOO AN</p>
             <nav className={styles.nav}>
                <a>ABOUT</a>
                <a>PROJECTS</a>
                <a>BlOG</a>
                {isLoggedIn && (
                    <>
                    <Link to={PATHS.PROJECT_POST}>NEW PROJECT</Link>
                        <Link to={PATHS.BLOG_POST}>NEW BLOG</Link>
                        
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;