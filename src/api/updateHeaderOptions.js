import  jwt from 'jwt-decode';

export function updateHeaderOptions(token) {

    const decoded = jwt(token)

    if (decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        console.log('localstorage cleared');
        window.location.replace('/login')
    }else{
        console.log('token is still valid');
    }
};