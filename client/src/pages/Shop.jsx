import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import Alert from "../components/Alert";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/Device/DeviceList";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination";
import Pages from "../components/Pagination";
import Select from "../components/Select";
import TypeBar from "../components/TypeBar";
import { fetchTypes,fetchBrands,fetchDevices, updateType } from "../http/deviceAPI";
import FilterEdit from "../modals/FilterEdit";
import '../styles/Shop.css'

const Shop=observer(()=>{
    const {device}=useContext(Context)
    const {user}=useContext(Context)
    const [update,setUpdate]=useState('')

    const [active,setActive]=useState(false)

    const updateTypeTest=()=>{
        console.log(device.selectedType.id,update)
        updateType({id:device.selectedType.id,name:update}).then(data=>
            console.log(data))
    }

    useEffect(()=>{
        device.setPage(0)
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))

        // fetchDevices(null,null,device.page,device.limit).then(data=>{
        //     device.setDevices(data.rows)
        //     device.setTotalCount(data.count)
        // })
    },[])

    useEffect(()=>{
        console.log(device.page+1)
        fetchDevices(device.selectedType.id,device.selectedBrand.id,device.page+1,device.limit).then(data=>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).then(()=>console.log(device.totalCount))
    },[device.page,device.selectedType,device.selectedBrand])
    
    
    return(<div className="container">
                <button onClick={()=>setActive(true)}>
                    test
                </button>
                <FilterEdit active={active} setActive={setActive} name='Types'/>
                <div className="shop">
                    {/* <div className="filter"> */}
                        <Filter device={device}/>
                        {/* <div>Types</div>
                        <TypeBar/>
                        <div>Brands</div>
                        <BrandBar/> */}
                    {/* </div> */}
                    <div className="device">
                        <DeviceList/>
                    </div>
                   {device.totalCount>0 && <Pagination 
                        setPage={device.setPage.bind(device)} 
                        listLength={device.totalCount}
                        limit={3}
                        page={device.page}

                    />}
                <div>
                       
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