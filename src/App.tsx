import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PATHS } from "./consts/Paths"
import BlogPost from "./pages/BlogPost/BlogPost"
import Home from "./pages/Home/Home"
import ProjectPost from "./pages/PojectPost/ProjectPost"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <ToastContainer 
        position='top-center'
        newestOnTop
        autoClose={3_000}
        limit={3}
        theme='light'/>
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
