import { Button, Card, CardHeader } from "@chakra-ui/react"
import React from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../../state/auth"
import AddTask from "../AddTask"
// import AddTask from "../AddTask"
import Calender from "../Calender/Calender"

const Dashbord = () => {
  const auth = useRecoilValue(userState)
  return (
    <div>
      <h2>{auth.user.name}</h2>
      <Card>
        <CardHeader>
          <AddTask />
        </CardHeader>
        <Calender />
      </Card>
    </div>
  )
}

export default Dashbord
