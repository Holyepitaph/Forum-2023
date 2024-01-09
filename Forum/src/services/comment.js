import axios from "axios"
const baseUrl = "/api/comment"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newComment = async (info) => {
  const response = await axios.post(baseUrl,info)
  return response.data
}

const newSubComment = async (info) => {
  const send = {
    text: info.text,
    link: info.link,
    image: info.image
  }
  const id = info.postId
  const response = await axios.post(`${baseUrl}/${id}`,send)
  return response.data
}

const deleteComment = async (info) => {
    const response = await axios.delete(baseUrl,{data:info})
    return response.data
  }

export default { getAll, newComment,newSubComment, deleteComment }