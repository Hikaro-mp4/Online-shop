import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import '../styles/TypeBar.css'

const TypeBar=observer(()=>{
    const {device}=useContext(Context)

    let handlerReset=()=>{
        device.setSelectedType(0)
    }

    return(<div className="typebar">
        <ul>
            {device.types.map(type=>
                <li 
                    style={type.id===device.selectedType.id?{color:'white'}:{}} 
                    onClick={()=>{
                        device.setSelectedType(type);
                        console.log(device.selectedType.id)}} 
                        key={type.id}>
                        {type.name}
                        </li>
                )}
            {device.selectedType.id && <li onClick={handlerReset}>сброс</li>}
        </ul>
    </div>)
})

export default TypeBar