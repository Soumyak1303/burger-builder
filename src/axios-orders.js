import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://react-my-burger-22f2c-default-rtdb.firebaseio.com/'
});

export default instance;
