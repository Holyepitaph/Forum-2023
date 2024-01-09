import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const check = async () => {
  const response = await axios.get(`${baseUrl}/check`)
  return response.data
}

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`)
  return response.data
}

export default { login, check,logout }