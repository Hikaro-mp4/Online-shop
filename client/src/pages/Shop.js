import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import Alert from "../components/Alert";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Filter from "../components/Filter/Filter";
import Pages from "../components/Pages";
import Select from "../components/Select";
import TypeBar from "../components/TypeBar";
import { fetchTypes,fetchBrands,fetchDevices, updateType } from "../http/deviceAPI";
import '../styles/Shop.css'

const Shop=observer(()=>{
    const {device}=useContext(Context)
    const {user}=useContext(Context)
    const [update,setUpdate]=useState('')

    const updateTypeTest=()=>{
        console.log(device.selectedType.id,update)
        updateType({id:device.selectedType.id,name:update}).then(data=>
            console.log(data))
    }

    useEffect(()=>{
        
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))

        // fetchDevices(null,null,device.page,device.limit).then(data=>{
        //     device.setDevices(data.rows)
        //     device.setTotalCount(data.count)
        // })
    },[])

    useEffect(()=>{
        // console.log('user',user.user.id)
        fetchDevices(device.selectedType.id,device.selectedBrand.id,device.page,device.limit).then(data=>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[device.page,device.selectedType,device.selectedBrand])
    
    
    return(<div className="container">
        <div className="shop_flex">
            <div className="filter">
                <Filter device={device}/>
                {/* <div>Types</div>
                <TypeBar/>
                <div>Brands</div>
                <BrandBar/> */}
            </div>
        <div>
                <DeviceList/>
                <Pages/>
                {/* <Select options={[1,2,4,5,6,7]} defaultValue={'List'}/> */}
               
                {/* <button onClick={updateTypeTest}>Update</button>
                <input
                    value={update}
                    onChange={(e)=>setUpdate(e.target.value)}/> */}
        </div>

        </div>
    </div>)
})

export default Shop