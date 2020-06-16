

const BASEURL = 'http://192.168.0.117:7777';

const apiService = {};

apiService.create = (user) => {
   return fetch(`${BASEURL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type' : 'application/json' },
    body: JSON.stringify(user),
   })
   .then((res) => res.text())
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
    .then((res) => res.text());
};

apiService.user = (token) => {
    return fetch(`${BASEURL}/user`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
         
    })
    .then((res) => res.json()); 
}
apiService.verify = (bid, token) => {
    return fetch(`${BASEURL}/verify`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({bid})
    })
    .then((res) => res.json()); 
}
apiService.visit = (bid, token) => {
    return fetch(`${BASEURL}/visit`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({bid}), 
    })
    .then((res) => res.json());
}
apiService.visited = (token) => {
    return fetch(`${BASEURL}/visited`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => res.json()); 
}
export default apiService;