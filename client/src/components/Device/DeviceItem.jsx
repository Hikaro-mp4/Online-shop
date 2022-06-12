import React, { useContext } from "react";
import { Context } from "../..";
// import '../styles/Device/DeviceItem.css'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from "../../utils/consts";
import { REACT_APP_API_URL } from "../../http";

import ratingImage from '../../images/star.png'

const DeviceItem=({device})=>{
    const rat=[1,2,3,4,5]
    const navigate=useNavigate()
   
    return( <div 
                className="device__item" 
                onClick={()=>navigate(DEVICE_ROUTE+'/'+device.id)}
                >
                <img 
                    className="device__img" 
                    src={REACT_APP_API_URL+ device.img}/>
                <span 
                    className="device__name">
                    {device.name}
                </span>
                <div 
                    className="device__rating">
                    {rat.map(i=>
                        <img 
                            key={i} 
                            style={i<=device.rating?
                            {}:
                            {filter:'opacity(0.2)'}} 
                            src={ratingImage}/>)}
                    <span>
                        {device.rating}
                    </span>
                </div>
                <span 
                    className="device__price">
                        {device.price} rub
                </span>
        
            </div>)
}

export default DeviceItem