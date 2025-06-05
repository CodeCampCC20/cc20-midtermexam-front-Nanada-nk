import axios from "axios"

const authApi = {}

const BASEURL = "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com"

authApi.register = (input) => {
  return axios.post(`${BASEURL}/api/V1/auth/register` ,input)
}

authApi.login = (input) => {
  return axios.post(`${BASEURL}/api/V1/auth/login` ,input)
}

export default authApi