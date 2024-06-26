//  ******************** Base URL ***********************
// let baseUrl = "http://localhost:8000/api/";
let baseUrl = "https://sore-cod-hosiery.cyclic.app/api/";
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

export const getUsers = async (keword) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "auth-token": token 
        },
    }
    const response = await fetch(baseUrl + `user/getotherusers?search=${keword}`, requestOptions)
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
    let data = await response?.json();
    return { data: data, ok: true }
}

export const userProfile = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + "users/userprofile", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response.json();
    return { data: data, ok: true }
}

export const getAllUserTrashBlogs = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + "blogs/mytrashblogs", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response.json();
    return { data: data, ok: true }
}

export const moveToTrash = async (id) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + `blogs/movetotrash?id=${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const moveToDraft = async (id) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + `blogs/movetodraft?id=${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getUserDrafts = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    }
    const response = await fetch(baseUrl + "blogs/getuserdrafts", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response.json();
    return { data: data, ok: true }
}

//  ******************** Chat API ***********************



export const accessChat = async (userId) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify({userId})
    }
    const response = await fetch(baseUrl + "chat/accesschat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getChats = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
    }
    const response = await fetch(baseUrl + "chat/fetchchat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const createGroup = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/creategroupchat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
//----
export const renameGroup = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/renamegroup", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}


export const groupAddMember = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/groupadd", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const groupRemoveMember = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/groupremove", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const sendUserMessage = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "message/sendmessage", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const fetcheMessages = async (chatId) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
    }
    const response = await fetch(baseUrl + `message/${chatId}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    // console.log(response)
    let data = await response?.json();
    return { data: data, ok: true }
}




