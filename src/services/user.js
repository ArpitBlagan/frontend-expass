import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const baseUrl='https://backendd-6s0h.onrender.com/exp';
export const userApi=createApi({
    reducerPath:'user',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints(builder){
        return{
            userReg:builder.mutation({
                query:(val)=>{
                    return{
                        url:'/register',
                        method:'post',
                        body:val,
                        credentials:"include"
                    }
                }
            }),
            userLogin:builder.mutation({
                query:(val)=>{
                    return{
                        url:'/login',
                        method:'post',
                        body:val,
                        headers:{
                            "content-type":"application/json"
                        },
                        credentials:"include",
                    }
                }
            }),
            userLoggedIn:builder.query({
                query:()=>{
                    return{
                        url:'/loggedIn',
                        credentials:"include",
                    }
                }
            }),
            
        }
    }
});
export const {useUserLoginMutation,useUserRegMutation,useUserLoggedInQuery}=userApi;