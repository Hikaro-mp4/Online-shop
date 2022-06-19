import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
// import '../styles/Device/DevicePage.css'
import { useParams } from "react-router-dom";
import { createRating, fetchOneDevices, fetchOneRatings, updateDevice } from "../http/deviceAPI";
import { REACT_APP_API_URL } from "../http";
import { observer } from "mobx-react-lite";
import { addToBasket, getBasket } from "../http/basketAPI";
import Alert from "../components/Alert";

import ratingImage from '../images/star.png'

const DevicePage=observer(()=>{
    //const {device}=useContext(Context)
    const rat=[1,2,3,4,5]
   
    //const dev=device.devices[0]
    const description=[
        {id:1,title:'Оперативная память',description:'5 гб'},
        {id:2,title:'Камера',description:'12 мп'},
        {id:3,title:'Процессор',description:'Пентиум 3'},
        {id:4,title:'Количество ядер',description:'2'},
        {id:5,title:'Аккумулятор',description:'4000 м/Ач'},
    ]

    const [device,setDevice]=useState({info:[]})
    const {id}=useParams()
    const {user,basket}=useContext(Context)
    const {rating}=useContext(Context)

    const [alert,setAlert]=useState('')
    
    console.log(id)
    useEffect(()=>{
        fetchOneDevices(id).then(data=>setDevice(data))
    },[])

    const setRating=async(rating)=>{
        const deviceId=Number(id)
        console.log(user.user.id,id,rating)
        createRating(user.user.id,deviceId,rating)
        .then(data=>{
            console.log('work?')
            setRating(data)
            fetchOneRatings(id)
            .then(rating=>
                updateDevice(id,rating)
                .then(data=>
                    fetchOneDevices(id)
                    .then(data=>
                        setDevice(data))))})
        .catch(err=>setAlert(err.response.data.message))
    }

    const addTo=async()=>{
        const deviceId=Number(id)
        addToBasket(deviceId,user.user.id)
        .then(da=>{  
             setAlert('Success add to basket')
            getBasket(user.user.id)
            .then(data=>{
                basket.setBasketCount(data.count)
            })
            
        })
        .catch(err=>setAlert(err.response.data.message))
        
    }

    return(<div className="container">       
                <div className="devpage">
                    <img 
                        className="devpage__img" 
                        src={REACT_APP_API_URL+ device.img}
                    /> 
                    <span className="devpage__name">{device.name}</span>
                    <span className="devpage__rating">
                        {rat.map(i=>
                            <img 
                                onClick={()=>setRating(i)}
                                key={i} 
                                style={i<=device.rating?
                                {}:
                                {filter:'opacity(0.2)'}} 
                                src={ratingImage}/>)
                        }
                        <span>{device.rating}</span>
                    
                    </span>  
                    <span className="devpage__price">{device.price+' rub.'}</span>
                    <button 
                        className='devpage__button' 
                        onClick={addTo}
                        >
                        Add in basket
                    </button>               
                   {device.info.length>0 && 
                     <div className="devpage__desc">
                     <h2>Сharacteristics</h2>
                     <ul>
                         {device.info.map(desc=>
                             <li key={desc.id}>
                                 {desc.title+': '+desc.description}
                             </li>)}
                     </ul>
                 </div>
                   }
                   
                </div>
        <Alert value={alert} setValue={setAlert}/>
    </div>)
})

export default DevicePage