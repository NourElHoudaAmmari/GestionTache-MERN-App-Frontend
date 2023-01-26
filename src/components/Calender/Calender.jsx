import React, { useEffect, useState } from "react"
import "@mobiscroll/react/dist/css/mobiscroll.min.css"
import {
  Eventcalendar,
  Draggable,
  setOptions,
  getJson,
} from "@mobiscroll/react"
import "./Calender.css"
import axios from "axios"
import { getConfig } from "../../config/config"
import DraggbleElm from "../DraggbleEl"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAllTasks } from "../../api.js/task"
import { addScheduleTask, getAllScheduleTask } from "../../api.js/schedule"
import { toast } from "react-toastify"

setOptions({
  theme: "ios",
  themeVariant: "light",
})

function Schedule() {
  const [myEvents, setEvents] = React.useState([])
  const [myTasks, setMyTasks] = useState([])
  const [loading, setLoading] = useState([])
  const [errors, setErrors] = useState(null)
  const client = useQueryClient()

  const { data, isLoading } = useQuery(["tasks"], () => getAllTasks(), {
    onError: (error) => {
      setErrors(error.response.data.message)
    },
    onSuccess: (data) => {
      console.log(data)
      setMyTasks(data)
    },
  })

  const {} = useQuery(["events"], () => getAllScheduleTask(), {
    onError: (error) => {
      setErrors(error.response.data.message)
    },
    onSuccess: (data) => {
      setEvents(data)
    },
  })
  const view = React.useMemo(() => {
    return {
      schedule: {
        type: "week",
        size: 4,
      },
    }
  }, [])

  const { mutate } = useMutation(addScheduleTask, {
    onError: (error) => {},
    onSuccess: (data) => {
      toast.success(`Task added successfully`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      })

      client.refetchQueries("events")
    },
  })

  const onEventCreate = React.useCallback((event) => {
    console.log(event)
    const {
      event: { title, description, color, start, end },
    } = event
    const task = {
      title,
      description,
      color,
      start,
      end,
    }
    mutate(task)
  }, [])

  return (
    <div className="mbsc-grid mbsc-no-padding">
      <div className="mbsc-row">
        <div className="mbsc-col-sm-9 external-drop-calendar">
          <Eventcalendar
            data={myEvents}
            view={view}
            dragToMove={true}
            externalDrop={true}
            onEventCreate={onEventCreate}
          />
        </div>
        <div className="mbsc-col-sm-3">
          <div className="mbsc-form-group-title">Available tasks</div>
          {myTasks?.map((el) => (
            <DraggbleElm task={el} key={el._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Schedule
