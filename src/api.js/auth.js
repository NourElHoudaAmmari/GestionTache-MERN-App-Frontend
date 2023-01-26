import axios from "axios"


export const register = async (user) => {
  const { data } = await axios.post("/api/user/", user)
  console.log(data)
  return data
}


export const login = async (user) => {
  const { data } = await axios.post("/api/user/login", user)
  console.log(data)
  return data
}

const authService = {
  register,
  login,
}

export default authService
