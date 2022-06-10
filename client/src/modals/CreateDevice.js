import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { createDevice, fetchBrands, fetchTypes } from "../http/deviceAPI";
import '../styles/Create/CreateDevice.css'

const CreateDevice=observer(({active,setActive})=>{
    const {device}=useContext(Context)
    const [info,setInfo]=useState([])
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [brand,setBrand]=useState('')
    const [type,setType]=useState('')
    const [file,setFile]=useState(null)

    useEffect(()=>{
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))
        device.setSelectedBrand(device.brands[0])
        device.setSelectedType(device.types[0])

    },[])

    const addInfo=()=>{
        setInfo([...info,{title:'',description:'',number:Date.now()}])
    }

    const remInfo=(number)=>{
        setInfo(info.filter(i=>i.number!==number))
    }

    const changeInfo=(key,value,number)=>{
        setInfo(info.map(i=>i.number===number?{...i,[key]:value}:i))
    }

    const selectFile=e=>{
        setFile(e.target.files[0])
    }

    const addDevice=()=>{
        const formData=new FormData()
        formData.append('name',name)
        formData.append('price',String(price))
        formData.append('img',file)
        formData.append('brandId',device.selectedBrand.id)
        formData.append('typeId',device.selectedType.id)
        formData.append('info',JSON.stringify(info))
        console.log(device.selectedBrand.id,device.selectedType.id)
        createDevice(formData).then(data=>{
            setActive(false)
        })

        console.log(info)
    }
    return(<div>
        {active?<div onClick={()=>setActive(false)} className="createDev_modal">
        <div onClick={(e)=>e.stopPropagation()} className="createDev_content">
            <h2>Add device</h2>
            <select 
                onChange={(e)=>{device.setSelectedType(device.types[e.target.selectedIndex])}} >
                {device.types.map(dev=>
                    <option 
                        value={dev}
                        
                        key={dev.id}>
                        {dev.name}
                    </option>)}
            </select>
            <select  onChange={(e)=>{device.setSelectedBrand(device.brands[e.target.selectedIndex])}} >
                {device.brands.map(dev=>
                <option 
    
                    key={dev.id}>
                    {dev.name}
                </option>)}
            </select>
            <input 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
                placeholder="device"
            />
            <input 
                value={price} 
                onChange={(e)=>setPrice(Number(e.target.value))} 
                placeholder="price" 
                type='number'
            />
            <input 
                className="createDev_file" 
                type='file' 
                onChange={selectFile}
            />
            <h3>Property</h3>
            <button 
                className="createDev_btnDel" 
                onClick={()=>addInfo()}>
                Add new property
            </button>
            
            {info.map(i=>
            <div key={i.number}>
                <input 
                    placeholder="title"
                    value={i.title}
                    onChange={(e)=>changeInfo('title',e.target.value,i.number)}
                />
                <input 
                    placeholder="description"
                    value={i.description}
                    onChange={(e)=>changeInfo('description',e.target.value,i.number)}
                />  
                <button className="createDev_btnDel" 
                    onClick={()=>remInfo(i.number)}>
                    x
                </button>
                
            </div>)}
            <button className="createDev_btn" onClick={()=>addDevice()}>Add</button>
        </div>
    </div>
    :
    <div></div>}
    </div>)
})

export default CreateDevice