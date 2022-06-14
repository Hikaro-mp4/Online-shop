import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import BasketItem from "./BasketItem";
// import '../styles/Basket/BasketList.css'

const BasketList=observer(({basket})=>{
    // const {basket}=useContext(Context)
    const test=[1,2,4,5,6]
    // console.log('b',basket.basket.length)
    return(<div className="basket__list">
        {basket.basket.length>0
            ?
            basket.basket.map(basketDevice=>
                <BasketItem key={basketDevice.id} basketDevice={basketDevice}/>
            )
            :
            <div className="basket__empty">Basket is empty</div>
        }
       
    </div>)
})

export default BasketList