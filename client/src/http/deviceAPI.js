import { $authHost,$host } from ".";
import jwt_decode from 'jwt-decode'

export const createType= async(type)=>{
    const {data}=await $authHost.post('api/type',type)
    return data
}

export const updateType= async(type)=>{
    const {data}=await $authHost.put('api/type',type)
    return data
}

export const deleteType= async(id)=>{
    console.log(id)
    const {data}=await $authHost.delete('api/type',{params:{id}})
    return data
}

export const fetchTypes= async()=>{
    const {data}=await $host.get('api/type')
    return data
}

export const createBrand= async(brand)=>{
    const {data}=await $authHost.post('api/brand',brand)
    return data
}

export const updateBrand= async(brand)=>{
    const {data}=await $authHost.put('api/brand',brand)
    return data
}

export const fetchBrands= async()=>{
    const {data}=await $host.get('api/brand')
    return data
}

export const createDevice= async(device)=>{
    const {data}=await $authHost.post('api/device',device)
    return data
}

export const updateDevice= async(id,rating)=>{
    const {data}=await $authHost.put('api/device',{id,rating})
    return data
}

export const fetchDevices= async(typeId,brandId,page,limit=5)=>{
    const {data}=await $host.get('api/device',{params:{
        typeId,brandId,page,limit
    }})
    return data
}

export const fetchOneDevices= async(id)=>{
    const {data}=await $host.get('api/device/'+id)
    return data
}

export const createRating= async(userId,deviceId,rate)=>{
    const {data}=await $authHost.post('api/rating',{userId,deviceId,rate})
    return data
}

export const fetchOneRatings= async(id)=>{
    console.log('API',id)
    const {data}=await $host.get('api/rating',{params:{id}})
    return data
}

export const updateRating= async()=>{
    const {data}=await $host.get('api/rating')
    return data
}