import axios from "axios"
const baseUrl = "/api/users"

const get = async () =>{
    const request = await axios.get(baseUrl)
    return request.data
}

const getAll = async () =>{
  const request = await axios.get(`${baseUrl}/all`)
  return request.data
}

const getOne = async (info) =>{
  const request = await axios.post(`${baseUrl}/one`,info)
  return request.data
}

const newUser = async (thing) => {
  const response = await axios.post(baseUrl,thing);
  return response.data;
};

const delUser = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  const updateUser = async (thing) => {
    const id = thing.username
    const update = {      
      admin: thing.admin=="" ? null: thing.admin,
      email: thing.email=="" ? null: thing.email,
      phone: thing.phone=="" ? null: thing.phone,
      password: thing.password=="" ? null : thing.password
    }
  
    const response = await axios.put(`${baseUrl}/${id}`,update);
    return response.data;
  };

export default { get, getAll,getOne, delUser, updateUser, newUser }