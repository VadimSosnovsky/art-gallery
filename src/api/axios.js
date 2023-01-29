import axios from 'axios'
import { MAIN_URL } from '../config'

export default axios.create({
  baseURL: `${MAIN_URL}`,
})
