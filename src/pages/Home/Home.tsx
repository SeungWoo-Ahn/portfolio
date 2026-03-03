import { useRef } from "react";
import Header from "../../components/Header/Header";
import AboutSection from "./AboutSection/AboutSection";
import BlogPostsSection from "./BlogPostsSection/BlogPostsSection";
import ProjectsSection from "./ProjectsSection/ProjectsSection";

export type SectionRef = 'about' | 'projects' | 'blogPosts';

const Home = () => {
    const sectionRefs = useRef<Record<SectionRef, HTMLDivElement | null>>({
        about: null,
        projects: null,
        blogPosts: null,
    });

    const scrollToSection = (ref: SectionRef) => {
        sectionRefs.current[ref]
            ?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <Header scrollToSection={scrollToSection} />
            <AboutSection ref={(el) => void (sectionRefs.current.about = el)}/>
            <ProjectsSection ref={(el) => void (sectionRefs.current.projects = el)}/>
            <BlogPostsSection ref={(el) => void (sectionRefs.current.blogPosts = el)}/>
        </>
    );
};

export default Home;