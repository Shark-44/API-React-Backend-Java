// App.tsx
import './App.css';
import { Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import Student from "./pages/Student";
import School from "./pages/School";
import Langage from "./pages/Langage";
import ManageStudent from './pages/ManageStudent';


import BTtab from './components/BTtab';

function App() {

  return (
    <>
        <BTtab />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/School" element={<School />} />
          <Route path="/Langage" element={<Langage />} />
          <Route path="/ManageStudent" element={<ManageStudent />} />
        </Routes>
    </>
  );
}

export default App;
