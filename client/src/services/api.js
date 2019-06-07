import axios from 'axios'

const URL = `http://localhost:4567`;

const api = axios.create({
    baseURL: `${URL}`
})

export const loginUser = async (data) => {
    try {
      const resp = await api.post(`/auth/login`, data)
      console.log(resp.data)
      return resp.data
    } catch (e) {
      console.log(e);
    }
}

export const createUser = async (data) => {
    try {
      const resp = await api.post('/users', data)
      return resp.data
    } catch (e) {
    console.log(e);
    }
}

export const getRecords = async (userId, token) => {
    try {
        const resp = await api.get(`/users/${userId}/records`, {headers: {"Authorization": token}})
        console.log(resp.data)
        return resp.data.records
    } catch(e) {
        console.log(e)
    }
}

export const makeRecord = async (userId, data, token) => {
    try {
        const resp = await api.post(`/users/${userId}/records`, data, {headers: {"Authorization": token}})
        console.log(resp)
        return resp
    } catch (e) {
        console.log(e)
    }
}


export const deleteRecord = async (userId, id, token) => {
    try {
        const resp = await api.delete(`/users/${userId}/records/${id}`, {headers: {"Authorization": token}});
        return resp.data;
    } catch (e) {
        console.log(e.message);
    }
}

export const updateRecord = async (userId, id, data, token) => {
    try {
        const resp = await api.put(`/users/${userId}/records/${id}`, data, {headers: {"Authorization": token}} )
        return resp
      } catch (e) {
        console.log(e);
      }
}
