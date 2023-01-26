import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import "./addTask.css"
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { FormLabel } from "@chakra-ui/react"
import moment from "moment"
import { useMutation, useQueryClient } from "react-query"
import { addTask } from "../../api.js/task"
import { toast } from "react-toastify"
import { margin } from "@mui/system"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default function AddTask() {
  const client = useQueryClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(0)
  const [color, setColor] = useState("")

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const headerStyle={margin:0}
const btnStyle={marginTop:5}
  const { mutate } = useMutation(addTask, {
    onError: (error) => {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
    },
    onSuccess: (data) => {
      toast.success(`Task added successfully`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      })
      handleClose()
      client.refetchQueries("tasks")
    },
  })

  const handleAddTask = () => {
    let date = moment("2023-01-01 08:00:00")
    let newDate = date.add(duration, "hours")
    mutate({
      title,
      description,
      start: moment("2023-01-01 08:00:00"),
      end: newDate.format(),
      color,
    })
  
  }
  return (
    <div style={{ float: "right", padding: "2%" }}>
      <Button onClick={handleOpen} color='primary'variant="contained">Add Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl align='center'>
            <h2 style={{textAlign:"center",margin:"0%"}}>Add Task</h2>
            <FormLabel >Title</FormLabel>
            <TextField
              fullWidth
              margin="dense"
              label="Title"
              id="Title"
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
              <FormLabel >Description</FormLabel>
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
              <FormLabel >Durée</FormLabel>
            <TextField
              fullWidth
              label="Duration"
              id="duration"
              margin="dense"
              type={"number"}
              onChange={(e) => setDuration(e.target.value)}
              required={true}
            />

            <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="red"
              name="radio-buttons-group"
              onChange={(e) => setColor(e.target.value)}
              required={true}
            >
              <FormControlLabel
                value="#39B5E0"
                control={<Radio />}
                label="blue"
                style={{ displey: "inline" }}
              />
            
              <FormControlLabel
                value="#F55050"
                control={<Radio />}
                label="red"
              />
              <FormControlLabel
                value="#00cc00"
                control={<Radio />}
                label="green"
              />
               <FormControlLabel
                value="#ff8000"
                control={<Radio />}
                label="orange"
              />
            </RadioGroup>
            <div style={{  paddingLeft: "8%"}}>
            <Button onClick={handleAddTask} variant='contained' color='primary'>Confirm</Button>
            <Button  variant='danger'id="cancelBtn" style={btnStyle} onClick={handleClose}>Close</Button></div>
          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}
