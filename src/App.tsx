import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProjectPost from "./pages/PojectPost/ProjectPost"
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail"
import BlogPost from "./pages/BlogPost/BlogPost"
import BlogDetail from "./pages/BlogDetail/BlogDetail"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects/new' element={<ProjectPost />} />
          <Route path='/projects/:slug' element={<ProjectDetail />} />
          <Route path='/blogs/new' element={<BlogPost />} />
          <Route path='/blogs/:slug' element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
