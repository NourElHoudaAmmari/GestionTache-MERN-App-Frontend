import axios from "axios"
import { getConfig } from "../config/config"

export const getAllScheduleTask = async () => {
  const { data } = await axios.get("/api/schedule/my", getConfig())

  return data
}
export const addScheduleTask = async (task) => {
  const { data } = await axios.post("/api/schedule/", task, getConfig())
  return data
}
