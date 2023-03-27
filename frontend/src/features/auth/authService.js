import axios from 'axios'

const API_URL = '/api/users';

//Register user
export const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    console.log(response);
    console.log(response.data);
    return response.data;
}

/* register({name: 'Milan', email: 'milan@test.com', password: '123'}); */

const authService = {
    register,
}

export default authService;