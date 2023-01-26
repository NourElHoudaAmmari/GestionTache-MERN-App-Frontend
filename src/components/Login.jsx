import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { userState } from "../state/auth"
import { useRecoilState } from "recoil"
import { useMutation } from "react-query"
import { login } from "../api.js/auth"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [auth, setAuth] = useRecoilState(userState)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const { email, password } = formData

  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation((user) => login(user), {
    onMutate: () => {
      setLoading(true)
    },
    onError: (error) => {
      setErrors()
      toast.error(
        "Une erreur s'est produite, veuillez réessayer, " +
          error.response.data.message,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        },
      )
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(`Welcome ${data.name}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      })
      localStorage.setItem("token", data.token)
      setAuth({ ...auth, isAuth: true, user: data })

      navigate("/taches")
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    mutate(userData)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting tasks</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
