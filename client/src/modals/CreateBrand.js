import React, { useState } from "react";
import { createBrand } from "../http/deviceAPI";
import '../styles/Create/CreateBrand.css'

const CreateBrand=({active,setActive})=>{
    const [value,setValue]=useState('')
    const addBrand=()=>{
        createBrand({name:value}).then(data=>{
            setValue('')
            setActive(false)
        })
    }
    return(<div>
        {active?<div onClick={()=>setActive(false)} className="createType_modal">
        <div onClick={(e)=>e.stopPropagation()} className="createType_content">
            <h2>Add brand</h2>
            <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="type"/>
            <button className="createType_btn" onClick={()=>addBrand()}>Add</button>
        </div>
    </div>
    :
    <div></div>}
    </div>)
}

export default CreateBrand