import axios from "axios"
const baseUrl = "/api/image"
let token

export const setTokenImages = (newToken) => {
    token = `Bearer ${newToken}`
  };

const getAll = async () =>{

    const request = await axios.get(`${baseUrl}/down`)
    return request.data
}

const createOrder = async (thing) =>{
  const config = {
      headers : {Authorization : token,
        'Content-Type': 'multipart/form-data'},
  }
  console.log(thing)
  const sendIt = {
    file: {...thing.file}
  }
  const request = await axios.post(`${baseUrl}/post/${sendIt.id}`,sendIt.file, config)
  return request.data
}


export default { getAll,  createOrder }