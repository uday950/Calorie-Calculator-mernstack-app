import {updateHeaderOptions} from './updateHeaderOptions'

export async function loginAPI(userDeatils) {
    const result = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify(userDeatils),
        headers: {
            'Content-Type': 'application/json',
            token: window.localStorage.getItem("token"),
        }
    });
    const data = await result.headers.get('token');

    console.log('result', result)
    console.log('data', data)

    return data;  
}

export async function signUpAPI(userDeatils) {
    const result = await fetch('/user/new', {
        method: 'POST',
        body: JSON.stringify(userDeatils),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await result.json();

    return data;
}