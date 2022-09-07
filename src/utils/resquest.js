import axios from 'axios'

const resquest = axios.create({
  baseURL: 'https://applet-base-api-t.itheima.net'
})
export default resquest
