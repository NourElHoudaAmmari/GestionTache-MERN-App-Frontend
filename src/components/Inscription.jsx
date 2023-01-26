import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import Spinner from "../components/Spinner"
import { useRecoilState } from "recoil"
import { userState } from "../state/auth"
import { register } from "../api.js/auth"
import { useMutation } from "react-query"

function Inscription() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [auth, setAuth] = useRecoilState(userState)
  const { name, email, password, password2 } = formData
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const { mutate, isLoading } = useMutation((user) => register(user), {
    onMutate: () => {},
    onError: (error) => {
      toast.error(
        "Une erreur s'est produite, veuillez réessayer" +
          error.response.data.message,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        },
      )
    },
    onSuccess: (data) => {
      toast.success(`Welcome ${data.name}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      })
      localStorage.setItem("token", data.token)
      setAuth({ ...auth, isAuth: true, user: data })
      navigate("/")
    },
    onSettled: () => {},
  })
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("Passwords do not match")
    } else {
      const userData = {
        name,
        email,
        password,
      }

      mutate(userData)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        {errors && (
          <div
            color="danger"
            // isOpen={errors ? true : false}
            onClick={() => setErrors(null)}
          >
            <strong>{errors}</strong>
          </div>
        )}
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
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
              minLength={5}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              required
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
export default Inscription
