export const getConfig = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  }
  return config
}

export function addHours(date, hours) {
  let today = date
  let x = today.setTime(date.getTime() + hours * 60 * 60 * 1000)
  console.log(x)
  return x
}
export const getDiffTime = (start, end) => {
  const date1 = new Date(start)
  const date2 = new Date(end)
  let diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60)
  return diff
}
