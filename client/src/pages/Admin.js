import React, { useState } from "react";
import CreateBrand from "../modals/CreateBrand";
import CreateDevice from "../modals/CreateDevice";
import CreateType from "../modals/CreateType";
import '../styles/Admin.css'

const Admin=()=>{
    const [activeDev,setActiveDev]=useState(false)
    const [activeType,setActiveType]=useState(false)
    const [activeBrand,setActiveBrand]=useState(false)

    const Test=()=>{
        
            //console.log("Совпадений: "+Number(counter/arr.length*100)+'%')
        
    }
    return(<div className="body">
        
       <div className="admin_flex">
        <div className="admin_content">
            <button className="admin_btn" onClick={()=>setActiveDev(true)}>Create device</button>
            <button className="admin_btn" onClick={()=>setActiveBrand(true)}>Create brand</button>
            <button className="admin_btn" onClick={()=>setActiveType(true)}>Create type</button>
            <button className="admin_btn" onClick={()=>Test()}>test</button>
        </div>
       </div>
        <CreateDevice active={activeDev} setActive={setActiveDev}/>
        <CreateType active={activeType} setActive={setActiveType}/>
        <CreateBrand active={activeBrand} setActive={setActiveBrand}/>
    </div>)
}

export default Admin