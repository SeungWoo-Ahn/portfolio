import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProjectPost from "./pages/PojectPost/ProjectPost"
import BlogPost from "./pages/BlogPost/BlogPost"
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
          <Route path={PATHS.PROJECT_EDIT()} element={<ProjectPost />} />
          <Route path={PATHS.BLOG_POST} element={<BlogPost />} />
          <Route path={PATHS.BLOG_EDIT()} element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
