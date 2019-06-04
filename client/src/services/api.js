import axios from 'axios'

const URL = `http://localhost:4567`;

// for the photo/video/posts uploads.
const api = axios.create({
    baseURL: `${URL}`
})

export const loginUser = async(data)=>{
    try {
      const resp = await api.post(`/auth/login`, data)
      console.log(resp.data)
      return resp.data
    } catch (e) {
      console.log(e);
    }
}

export const createUser = async(data)=>{
    try {
      const resp = await api.post('/users', data)
      return resp.data
    } catch (e) {
    console.log(e);
    }
  }