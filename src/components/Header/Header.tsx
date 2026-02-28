import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
             <nav className={styles.nav}>
                <a>ABOUT</a>
                <a>PROJECTS</a>
                <a>BlOG</a>
            </nav>
        </header>
    );
};

export default Header;