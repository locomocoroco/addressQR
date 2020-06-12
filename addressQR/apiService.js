
const BASEURL = 'http://localhost:3001';

const apiService = {};

apiService.create = (user) => {
   return fetch(`${BASEURL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type' : 'application/json' },
    body: JSON.stringify(user),
   })
   .then((res) => res.json())
   .catch((err) => console.log(err));
};

apiService.login = (user) => {
    return fetch(`${BASEURL}/login`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user), 
    })
    .then((res) => res.json());
};

export default apiService;