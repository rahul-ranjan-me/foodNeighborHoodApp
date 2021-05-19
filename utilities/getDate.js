const getDate = () => {
  const curDate = new Date()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${curDate.getDate()}-${months[curDate.getMonth()]}-${curDate.getFullYear()} ::: ${curDate.getHours()}:${curDate.getMinutes()}`
}

export default getDate