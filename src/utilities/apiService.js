//  ******************** Base URL ***********************
let baseUrl="http://localhost:8000/api/";

//  ******************** User API ***********************
export const userLogin = async(email,password) => {
    const requestOptions={
        method:"POST",
        mode:"cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    }
    const response=await fetch(baseUrl+"users/userlogin",requestOptions)
    if(!response.ok){
        let data=await response.json();
        return {data:data,ok:false}
    }
    let data=await response?.json();
    return {data:data,ok:true}
}

export const userRegister = async(name,email,password) => {
    const requestOptions={
        method:"POST",
        mode:"cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
    }
    const response=await fetch(baseUrl+"user/usersignup",requestOptions)
    if(!response.ok){
        let data=await response.json();
        return {data:data,ok:false}
    }
    let data=await response?.json();
    return {data:data,ok:true}
}

//  ******************** Blog API ***********************

export const getAllBlogs = async() => {
    let token=JSON.parse(localStorage.getItem('ezuth-token'))
    const requestOptions={
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
            "ezuth-token":token
        },
    }
    const response=await fetch(baseUrl+"blogs",requestOptions)
    if(!response.ok){
        let data=await response.json();
        return {data:data,ok:false}
    }
    let data=await response?.json();
    return {data:data,ok:true}
}