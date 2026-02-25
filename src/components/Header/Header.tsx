import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import { PATHS } from '../../consts/Paths';

const Header = () => {
    return (
        <header className={styles.header}>
            <p className={styles.logo}>Portfolio</p>
            <nav className={styles.nav}>
                <Link to={PATHS.BLOG_POST}>새 블로그 글</Link>
                <Link to={PATHS.PROJECT_POST}>새 프로젝트 글</Link>
            </nav>
        </header>
    );
};

export default Header;