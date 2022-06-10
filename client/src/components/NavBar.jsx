import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "..";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
// import '../styles/NavBar.css'
// import '../styles/scss/style.css'


const NavBar=observer(()=>{
    const {user}=useContext(Context)
    const {basket}=useContext(Context)
    const navigate=useNavigate()

    const [active,setActive]=useState(false)
    
    const url_path='https://png.pngtree.com/png-vector/20190929/ourmid/pngtree-shopping-cart-icon-png-image_1770325.jpg'   
    console.log('user',user.user.role)
    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    let handler=(e)=>{
        setActive(prev=>!prev)
    }

    return(<div >
        <div className="navbar">   
            <NavLink onClick={()=>setActive(false)} className='navbar__link' to={SHOP_ROUTE}>
                <img className="navbar__logo" src={url_path}/>
                <div className="navbar__maintext">
                    Shop
                </div>
            </NavLink> 
            <div onClick={()=>setActive(false)} className={active?"navbar__menu active":'navbar__menu'}>  
                {user.isAuth?
                <div className="navbar__auth">
                    <span className="navbar__username">
                        {user.user.email+' '+user.user.role}
                    </span>
                    <button 
                        className='navbar__button' 
                        onClick={()=>navigate(BASKET_ROUTE)}
                        >
                            Basket
                        <span className="navbar__basketcount">
                            {basket.basketCount}
                        </span>
                    </button>
                    {user.user.role==='ADMIN'&&<button 
                        className='navbar__button' 
                        onClick={()=>navigate(ADMIN_ROUTE)}
                        >
                            Admin pannel
                    </button>}
                    <button 
                        className='navbar__button'
                        onClick={()=>{logOut()}}
                        >
                            Exit
                    </button>
                </div>
                :
                <div className="navbar__nauth">
                    <button 
                        className='navbar__button' 
                        onClick={()=>{navigate(LOGIN_ROUTE)}}
                        >
                            Login
                    </button>
                </div>
                }
            </div>
            <div onClick={handler} className={active?"navbar__burger active":'navbar__burger'}>
                <span></span>
            </div>
        </div>
    </div>)
})

export default NavBar