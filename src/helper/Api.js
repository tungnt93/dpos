
export const api = (api, data) => (
    // console.log(JSON.stringify(data))
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res =>  res.text())
);