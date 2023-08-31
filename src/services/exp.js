import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const baseUrl='https://backendd-6s0h.onrender.com/exp';
export const expApi=createApi({
    reducerPath:'exp',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints(builder){
        return{
            getExps:builder.query({
                query:()=>{
                    return{
                        url:'/all'
                    }
                }
            }),
            addExp:builder.mutation({
                query:(val)=>{
                    return {
                        url:'/add',
                        method:'post',
                        body:val,
                        credentials:"include"
                    }
                }
            }),
            addExpView:builder.mutation({
                query:(val)=>{
                    return {
                        url:`/addOther/${val.id}`,
                        method:'put',
                        body:val,
                        credentials:"include"
                    }
                }
            })
        }
    }
});
export const {useGetExpsQuery,useAddExpMutation,useAddExpViewMutation}=expApi;