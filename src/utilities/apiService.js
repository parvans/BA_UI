//  ******************** Base URL ***********************
let baseUrl = "http://localhost:8000/api/";
// let baseUrl = "https://ezuth.herokuapp.com/api/";
//  ******************** Token ***********************
var token = localStorage.getItem('ezuth-token')
//  ******************** User API ***********************
export const userLogin = async (email, password) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }
    const response = await fetch(baseUrl + "users/userlogin", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const userRegister = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "users/usersignup", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const verifyUserEmail = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "users/verifyemail", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const verifyUserOtp = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "users/verifyotp", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const userResetPassword = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "users/resetpassword", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

//  ******************** Blog API ***********************

export const getAllBlogs = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + "blogs/allblogs", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getMyBlogs = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + "blogs/myblogs", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const getABlog = async (id) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + `blogs/getablog?id=${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const deleteMyBlogs = async (id) => {
    const requestOptions = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + `blogs/deleteblog?id=${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const addUserBlog = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "auth-token": token
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "blogs/add", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const editUserBlog = async (body,id) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "auth-token": token
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + `blogs/updateblog?id=${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    return { ok: true }
}


