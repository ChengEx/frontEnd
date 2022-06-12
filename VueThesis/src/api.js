import axios from 'axios'

const url = 'http://localhost:4000'

const APIRequest = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json' },
})

//axios instance攔截器
APIRequest.interceptors.request.use((req)=>{
      
  if (localStorage.getItem('profile')) {
    //console.log(localStorage.getItem('profile'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
})

export const signIn = (data) => {
    return APIRequest.post('/Customer/signin',data);
}
export const signUp = (data) => {
    return APIRequest.post('/Customer/signup',data);
}
export const getInventories = () => {
    return APIRequest.get('/Inventory');
}
export const getInventoryById = (id) => {
    return APIRequest.get(`/Inventory/${id}`);
}
export const getInventoriesByCategories = (category,type) => {
    return APIRequest.get(`/Inventory/${category}/${type}`);
}

export const getCategories = () => {
    return APIRequest.get('/Category');
}
export const getCategoriesByIdentity = (identity) => {
    return APIRequest.get(`/Category/${identity}`);
}

export const addInventories = (data) => {
    return APIRequest.post('/Inventory',data);
}

export const getCart = (id) => {
    return APIRequest.get(`/Cart/${id}`);
}
export const addCart = (data) => {
    return APIRequest.post('/Cart', data);
}
export const addCartQuantity = (id) => {
    return APIRequest.post(`/Cart/addCartQuantity/${id}`);
}
export const minusCartQuantity = (id) => {
    return APIRequest.post(`/Cart/minusCartQuantity/${id}`);
}
export const deleteCart = (id) => {
    return APIRequest.post(`/Cart/deleteCart/${id}`);
}

