import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "..";

import BasketList from "../components/Basket/BasketList";
import { getBasket } from "../http/basketAPI";

const Basket=observer(()=>{
    const {user}=useContext(Context)
    const {basket}=useContext(Context)

    useEffect(()=>{
            getBasket(user.user.id)
            .then(data=>{
                basket.setBasket(data.rows)
                basket.setBasketCount(data.count)
            }
            ) 
    },[])
    const bas=async()=>{
       // basket.basket.map(dev=>console.log('1',dev))
       console.log(user.user,basket.basket)
    }
    return(<div className="container">
        <div className="basket">
       <BasketList basket={basket}/>
       {/* <button onClick={bas}>click on button - u get result</button> */}
      {basket.basket.length>0 &&
         <div className="basket__totalprice">
         Total price:{basket.basket.reduce((sum,device)=>sum+device.price,0)} rub
    </div>
      }
    </div>
    </div>)
})

export default Basket