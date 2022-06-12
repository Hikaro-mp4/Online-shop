import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import DeviceItem from "./DeviceItem";
import { Context } from "../..";
// import '../styles/Device/DeviceList.css'

const DeviceList=observer(()=>{
    const {device}=useContext(Context)
    
    return(<div className="device__list">
        {device.devices.length>0
            ?
            device.devices.map(dev=>
                <DeviceItem key={dev.id} device={dev}/>
            )
            :
            <div className="device__empty">Devices not found</div>
            }
        
    </div>)
})

export default DeviceList