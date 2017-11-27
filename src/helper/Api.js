
export const api = (api, data) => (
    fetch(api, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res =>  res.text())
);

// export const api = (api, data1) => {
//     let data = {
//         method: 'POST',
//         credentials: 'same-origin',
//         mode: 'same-origin',
//         body: JSON.stringify(data1),
//         headers: {
//             'Accept':       'application/json',
//             'Content-Type': 'application/json',
//         }
//     };
//     fetch('http://kyucxua.net:80/api/MobileApp/login', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             username: 'admin',
//             password: 'adminA123',
//         })
//     })
//         .then(response => console.log(response.text()))
// };