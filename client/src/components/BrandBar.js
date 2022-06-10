import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import '../styles/TypeBar.css'

const BrandBar=observer(()=>{
    const {device}=useContext(Context)

    let handlerReset=()=>{
        device.setSelectedBrand(0)
    }

    return(<div className="typebar">
        <ul>
            {device.brands.map(brand=>
                <li 
                style={
                    brand.id===device.selectedBrand.id
                    ?
                    {color:'white'}
                    :
                    {}
                } 
                onClick={
                    ()=>{
                        device.setSelectedBrand(brand);
                        console.log(device.selectedBrand.id)
                    }} 
                    key={brand.id}
                    >
                        {brand.name}
                    </li>
                )}
                   {device.selectedBrand.id && <li onClick={handlerReset}>сброс</li>}
        </ul>
     
    </div>)
})

export default BrandBar