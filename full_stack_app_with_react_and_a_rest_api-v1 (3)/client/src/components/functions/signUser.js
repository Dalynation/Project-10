export function signUser(type, userData) {
    let BaseUrl = 'http://localhost:5000/api/users';

    return new Promise((resolve, reject) => {
        fetch(BaseUrl,{
            method: 'GET',
          //  body: JSON.stringify(userData)

        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error)=> {
            reject(error);
        })
    });
}