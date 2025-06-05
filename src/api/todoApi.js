import axios from "axios"

const todoApi = {}

const BASEURL = "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com"

todoApi.createTodo = (input) => {
  return axios.post(`${BASEURL}/api/V1/todos`,input)
}

todoApi.getAllTodoByUserID = (userId) => {
  return axios.get(`${BASEURL}/api/V1/todos/${userId}`)
}

todoApi.deleteTodo = (id) => {
  return axios.delete(`${BASEURL}/api/V1/todos/${id}/14`)
}

todoApi.updateTodo = (userId,id,input) => {
  console.log('userId', userId)
  console.log('id', id)
  console.log('input', input)
  return axios.patch(`${BASEURL}/api/V1/todos/${id}/14`,input)
}

export default todoApi