import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Login from "./components/Login"
import Inscription from "./components/Inscription"
import Dashbord from "./components/Dashbord/Dashbord"
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/taches" element={<Dashbord />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
