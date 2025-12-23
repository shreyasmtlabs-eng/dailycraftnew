import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ADMIN_URL } from '../apiconfig';
import { store } from '../../redux/store';


export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminAxios = axios.create({
  baseURL: API_ADMIN_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});


const requestInterceptor = async (config:any) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    return Promise.reject({ message: 'No internet connection.' });
  }

  // const token = await AsyncStorage.getItem('token');
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  return config;
};

axiosInstance.interceptors.request.use(requestInterceptor);
adminAxios.interceptors.request.use(requestInterceptor);


axiosInstance.interceptors.response.use(
 (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
