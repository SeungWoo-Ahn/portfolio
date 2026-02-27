import Header from "../../components/Header/Header";
import BlogPostsSection from "./BlogPostsSection/BlogPostsSection";
import ProjectsSection from "./ProjectsSection/ProjectsSection";

const Home = () => {
    return (
        <>
            <Header />
            <ProjectsSection />
            <BlogPostsSection />
        </>
    );
};

export default Home;