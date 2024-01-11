import axios from "axios"
const baseUrl = "/api/friend"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const check = async (info) =>{
  const response = await axios.post(`${baseUrl}/check`, info)
  return response.data
}

const newFriend = async (info) => {
    const send ={
        status: 'friend',
        userId: info.userId
    }
  const response = await axios.post(baseUrl,send)
  return response.data
}

const blockUser = async (info) => {
  const send ={
      status: 'blocked',
      userId: info.userId
  }
const response = await axios.post(baseUrl,send)
return response.data
}


const deleteFriend = async (info) => {
    const response = await axios.delete(baseUrl, {data:info})
    return response.data
  }

export default { getAll,check, newFriend ,blockUser , deleteFriend }