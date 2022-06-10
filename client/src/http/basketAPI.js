import { $authHost,$host } from ".";
import jwt_decode from 'jwt-decode'

export const addToBasket= async(deviceId,userId)=>{
    const {data}=await $authHost.post('api/basket',{deviceId,userId})
    return data
}

export const getBasket= async(id)=>{
    console.log(id)
    const {data}=await $authHost.get('api/basket',{params:{id}})
    return data
}

export const delBasket=async(userId,deviceId)=>{
    const {data}=await $authHost.delete('api/basket',{params:{userId,deviceId}})
    return data
}