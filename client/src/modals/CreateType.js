import React, { useState } from "react";
import { createType } from "../http/deviceAPI";
import '../styles/Create/CreateType.css'

const CreateType=({active,setActive})=>{
    const [value,setValue]=useState('')
    const addType=()=>{
        createType({name:value}).then(data=>{
            setValue('')
            setActive(false)
        })
    }

    return(<div>
        {active?<div onClick={()=>setActive(false)} className="createType_modal">
        <div onClick={(e)=>e.stopPropagation()} className="createType_content">
            <h2>Add type</h2>
            <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="type"/>
            <button className="createType_btn" onClick={()=>addType()}>Add</button>
        </div>
    </div>
    :
    <div></div>}
    </div>)
}

export default CreateType