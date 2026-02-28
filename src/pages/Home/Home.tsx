import Header from "../../components/Header/Header";
import AboutSection from "./AboutSection/AboutSection";
import BlogPostsSection from "./BlogPostsSection/BlogPostsSection";
import ProjectsSection from "./ProjectsSection/ProjectsSection";

const Home = () => {
    return (
        <>
            <Header />
            <AboutSection />
            <ProjectsSection />
            <BlogPostsSection />
        </>
    );
};

export default Home;