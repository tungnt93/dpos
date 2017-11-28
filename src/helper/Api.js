
export const api_post = (api, token, data) => (
    fetch(api, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(data)
    })
        .then(res =>  res.text())
);

export const api_get = (api, callback) => {
    fetch(api)
        .then((response)=> response.json())
        .then((responseData)=>{
            callback(responseData);
        });
    // fetch(api).then(res => res.text());
};