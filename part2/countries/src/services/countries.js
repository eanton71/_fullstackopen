import axios from 'axios'
const urlCountries   = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const request = axios.get(`${urlCountries}api/all`)
    return request.then(response => response.data)
}
const get = (name) => {
    const request = axios.get(`${urlCountries}api/name/${name}`)
    return request.then(response => response.data)
}

export default { getAll,get }