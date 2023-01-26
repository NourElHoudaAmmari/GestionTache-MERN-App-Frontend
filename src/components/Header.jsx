import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
// import { useSelector, useDispatch } from 'react-redux'
import { userState } from "../state/auth"

function Header() {
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(userState)

  const onLogout = () => {
    localStorage.removeItem("token")
    setAuth({ isAuth: false, erros: null, user: null })
    navigate("/")
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <b> Gestion des emplois </b>
        </Link>
      </div>
      <ul>
        {auth.isAuth ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/inscription">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
