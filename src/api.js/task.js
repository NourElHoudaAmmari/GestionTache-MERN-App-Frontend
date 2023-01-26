// eslint-disable-next-line react-hooks/exhaustive-deps
import axios from "axios"
import { getConfig } from "../config/config"

export const getAllTasks = async () => {
  const { data } = await axios.get("/api/task/my", getConfig())
  console.log("here")

  return data
}

export const addTask = async (task) => {
  const { data } = await axios.post("/api/task/", task, getConfig())
  return data
}
export const deleteTask = async (id) => {
  const { data } = await axios.delete(`/api/task/${id}`, getConfig())
  return data
}
