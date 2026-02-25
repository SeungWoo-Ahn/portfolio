import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProjectPost from "./pages/PojectPost/ProjectPost"
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail"
import BlogPost from "./pages/BlogPost/BlogPost"
import BlogDetail from "./pages/BlogDetail/BlogDetail"
import { PATHS } from "./consts/Paths"
import Header from "./components/Header/Header"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.PROJECT_POST} element={<ProjectPost />} />
          <Route path={PATHS.PROJECT_DETAIL()} element={<ProjectDetail />} />
          <Route path={PATHS.BLOG_POST} element={<BlogPost />} />
          <Route path={PATHS.BLOG_DETAIL()} element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
