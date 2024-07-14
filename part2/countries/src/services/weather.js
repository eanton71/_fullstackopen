import axios from 'axios'
const url = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_WEATHER_KEY;
 
const getLatLonWeather = (lat,lon) => {
    const request = axios.get(`${url}lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}
const getCityWeather = (city) => {
    const request = axios.get(`${url}q=${city}&units=metric&appid=${api_key}`)
    return request.then(response => response.data)
}
export default {  getCityWeather,getLatLonWeather }

