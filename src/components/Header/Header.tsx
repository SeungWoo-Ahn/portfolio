import type { SectionRef } from '../../pages/Home/Home';
import styles from './Header.module.css';

interface HeaderProps {
    scrollToSection: (ref: SectionRef) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
    return (
        <header className={styles.header}>
             <nav className={styles.nav}>
                <a onClick={() => scrollToSection('about')}>ABOUT</a>
                <a onClick={() => scrollToSection('projects')}>PROJECTS</a>
                <a onClick={() => scrollToSection('blogPosts')}>BlOG</a>
            </nav>
        </header>
    );
};

export default Header;