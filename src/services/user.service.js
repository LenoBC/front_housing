import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/users/';
class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getHelloPage() {
    return axios.post(API_URL + 'hello', { headers: authHeader() });
  }
}
export default new UserService();