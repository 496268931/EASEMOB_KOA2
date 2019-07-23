const axios = require('axios')
export function axiosPost(url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.post(
            `${process.env.JIGUANG_HOST}` + url,
            data,
            {
                headers: Object.assign(headers, {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.JIGUANG_Authorization}`
                })
            }
        )
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}
export function axiosGet(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.get(
            `${process.env.JIGUANG_HOST}` + url,
            {
                params,
                headers: Object.assign(headers, {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.JIGUANG_Authorization}`
                })
            },
        )
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function axiosDelete(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(
            `${process.env.JIGUANG_HOST}` + url,
            {
                params,
                headers: Object.assign(headers, {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.JIGUANG_Authorization}`
                })
            },
        )
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function axiosPut(url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.put(
            `${process.env.JIGUANG_HOST}` + url,
            {
                data,
            },
            {
                headers: Object.assign(headers, {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.JIGUANG_Authorization}`
                })
            }
        )
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}