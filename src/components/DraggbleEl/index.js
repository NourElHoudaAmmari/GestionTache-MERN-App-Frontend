import { Draggable } from "@mobiscroll/react"
import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { deleteTask } from "../../api.js/task"
import { getDiffTime } from "../../config/config"

const DraggbleElm = ({ task }) => {
  const [draggableTask, setDraggableTask] = React.useState()
  const client = useQueryClient()

  const setElm = React.useCallback((elm) => {
    setDraggableTask(elm)
  }, [])

  const { mutate } = useMutation(deleteTask, {
    onError: (error) => {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      })
    },
    onSuccess: (data) => {
      toast.success(`Task deleted successfully`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      })
      client.refetchQueries("tasks")
    },
  })

  const handleDelete = () => {
    mutate(task._id)
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        ref={setElm}
        className="external-drop-task"
        style={{ background: task.color, width: "100%" }}
      >
        <div>{task.title}</div>
        <div>{getDiffTime(task.start, task.end)}</div>
        <Draggable dragData={task} element={draggableTask} />
      </div>
      <div style={{ cursor: "pointer" }} onClick={handleDelete}>
        X
      </div>
    </div>
  )
}

export default DraggbleElm
