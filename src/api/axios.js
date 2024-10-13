import axios from 'axios';

// Axios instance yaratamiz
const axiosInstance = axios.create({
  baseURL: 'https://surprize.uz/api/', // URL asosiy manzil
  timeout: 10000, // So'rovning maksimal kutish vaqti (10 soniya)
  headers: {
    'Content-Type': 'application/json', // JSON formatida so'rovlar yuboriladi
    'Accept': 'application/json',
  },
});

export default axiosInstance;
