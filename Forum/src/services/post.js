import axios from "axios"
const baseUrl = "/api/post"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newPost = async (info) => {
  const response = await axios.post(baseUrl,info)
  return response.data
}

const changeForum = async () => {
  const response = await axios.post(`${baseUrl}/logout`)
  return response.data
}

const deletePost = async (info) => {
    const response = await axios.delete(baseUrl,{data:info})
    return response.data
  }

export default { getAll, newPost,changeForum, deletePost }