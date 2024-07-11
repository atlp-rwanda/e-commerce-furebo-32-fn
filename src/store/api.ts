import { BASE_API_URL } from "../utils/constants/config";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseAPI=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),
    tagTypes:[],
    endpoints:()=>({}),
})

export default baseAPI;