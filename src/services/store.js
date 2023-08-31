import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { expApi } from './exp';
import { userApi } from "../services/user";
const store=configureStore({
    reducer:{
        [expApi.reducerPath]:expApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([expApi.middleware,userApi.middleware])
});
export default store;