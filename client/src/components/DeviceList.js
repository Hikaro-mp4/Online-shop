import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import DeviceItem from "./DeviceItem";
import '../styles/Device/DeviceList.css'

const DeviceList=observer(()=>{
    const {device}=useContext(Context)
    return(<div className="dev_list">
        {device.devices.length>0
            ?
            device.devices.map(dev=>
                <DeviceItem key={dev.id} device={dev}/>
            )
            :
            <div>Devices not found</div>
            }
        
    </div>)
})

export default DeviceList