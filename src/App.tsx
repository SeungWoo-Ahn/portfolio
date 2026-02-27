import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PATHS } from "./consts/Paths"
import BlogPost from "./pages/BlogPost/BlogPost"
import Home from "./pages/Home/Home"
import ProjectPost from "./pages/PojectPost/ProjectPost"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.PROJECT_POST} element={<ProjectPost />} />
          <Route path={PATHS.PROJECT_EDIT()} element={<ProjectPost />} />
          <Route path={PATHS.BLOG_POST} element={<BlogPost />} />
          <Route path={PATHS.BLOG_EDIT()} element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
