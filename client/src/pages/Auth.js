import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { NavLink,useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { getBasket } from "../http/basketAPI";
import { login, registration } from "../http/userAPI";
import '../styles/Auth.css'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
const Auth=observer(()=>{
    const {user,basket}=useContext(Context)
    const location=useLocation()
    const navigate=useNavigate()
    const isLogin=location.pathname===LOGIN_ROUTE
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    

    const click=async()=>{
        try{
            let data
            if(isLogin){
                data=await login(email,password)
              //console.log(user)
            }else{
                console.log(email,password)
                data=await registration(email,password)
                console.log('sda')
            }
            console.log(data)
            user.setUser(data)
            user.setIsAuth(true)
            getBasket(user.user.id).then(dat=>{
                basket.setBasketCount(dat.count)
              })
            navigate(SHOP_ROUTE)
        }catch(e){
            alert(e.response.data.message)
        }
    }
    return(<div className="body">
        <div className="flex">
            <div className="form">
                <div className="auth">{isLogin?'Authorization':'Registration'}</div>
                <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {isLogin?
                <div>No account?<NavLink className='link_reg' to={REGISTRATION_ROUTE}> Registration</NavLink></div>
                :<div>Have account?<NavLink className='link_reg' to={LOGIN_ROUTE}> Login</NavLink></div>
                }
                <button className="button_style" onClick={click}>{isLogin?'Enter':'Registration'}</button>
            </div>
        </div>
    </div>)
})

export default Auth