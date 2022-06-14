import React, { useContext } from "react";
import { Context } from "../..";
// import '../styles/Basket/BasketItem.css'
import {useNavigate} from 'react-router-dom'
import { BASKET_ROUTE,DEVICE_ROUTE } from "../../utils/consts";
import { REACT_APP_API_URL } from "../../http";
import { observer } from "mobx-react-lite";
import { delBasket,getBasket } from "../../http/basketAPI";

import ratingImage from '../../images/star.png'

const BasketItem=observer(({basketDevice})=>{
    const {user}=useContext(Context)
    const {basket}=useContext(Context)

    const del=async(e)=>{
        e.stopPropagation()
        delBasket(user.user.id,basketDevice.id)
        .then(del=>
            {
                getBasket(user.user.id)
                .then(data=>{
                    basket.setBasket(data.rows)
                    basket.setBasketCount(data.count)
                }
                ) 
            })
    }
    const rat=[1,2,3,4,5]  
    const navigate=useNavigate()
   
    return(<div 
        className="basket__item" 
        onClick={()=>navigate(DEVICE_ROUTE+'/'+basketDevice.id)} >
        <img  
            className="basket__img" 
            src={REACT_APP_API_URL+ basketDevice.img}/>
        <span 
            className="basket__name"
        >
            {basketDevice.name}
        </span>
        <span 
            className="basket__rating">
            <span>
                {rat.map(i=>
                    <img key={i} style={i<=basketDevice.rating?
                    {}:
                    {filter:'opacity(0.2)'}} src={ratingImage}/>)}
            </span>
             <span>
                {basketDevice.rating}
            </span>
        </span>
       
        <span 
            className="basket__price"
        >
            {basketDevice.price} rub
        </span>
        <button 
            className="basket__button" 
            onClick={del}
        >
            X
        </button>
        
    </div>)
})

export default BasketItem