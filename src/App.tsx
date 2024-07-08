import './App.css'

import { Route, Routes } from "react-router-dom"


import Home from "./pages/Home"
import Student from "./pages/Student"
import School from "./pages/School"
import Langage from "./pages/Langage"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Student" element={<Student />} />
      <Route path="/School" element={<School />} />
      <Route path="/Langage" element={<Langage />} />
    </Routes>
    </>
  )
}

export default App
