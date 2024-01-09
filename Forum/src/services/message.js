import axios from "axios"
const baseUrl = "/api/message"

const get = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const newMessage = async (info) => {
  const response = await axios.post(baseUrl,info)
  return response.data
}

const changeForum = async () => {
  const response = await axios.post(`${baseUrl}/logout`)
  return response.data
}

const deleteForum = async () => {
    const response = await axios.post(`${baseUrl}/logout`)
    return response.data
  }

export default {get, getAll, newMessage ,changeForum, deleteForum }