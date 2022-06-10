import React, { useContext } from "react";
import { Context } from "..";
import '../styles/Device/DeviceItem.css'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from "../utils/consts";
import { REACT_APP_API_URL } from "../http";

import ratingImage from '../images/star.png'

const DeviceItem=({device})=>{
    const rat=[1,2,3,4,5]
    const navigate=useNavigate()
   
    return(<div className="dev_item" onClick={()=>navigate(DEVICE_ROUTE+'/'+device.id)}>
        <img className="dev_img" src={REACT_APP_API_URL+ device.img}/>
        <div>{device.name}</div>
        <div className="dev_rating">
            <div>{rat.map(i=>
            <img key={i} style={i<=device.rating?
            {}:
            {filter:'opacity(0.2)'}} src={ratingImage}/>)}</div>
            <div>{device.rating}</div></div>
        <div>{device.price} rub</div>
        
    </div>)
}

export default DeviceItem