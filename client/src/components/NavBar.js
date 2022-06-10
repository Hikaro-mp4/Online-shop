import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "..";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
// import '../styles/NavBar.css'
// import '../styles/scss/style.css'


const NavBar=observer(()=>{
    const {user}=useContext(Context)
    const {basket}=useContext(Context)
    const navigate=useNavigate()


    
    const url_path='https://png.pngtree.com/png-vector/20190929/ourmid/pngtree-shopping-cart-icon-png-image_1770325.jpg'   
    console.log('user',user.user.role)
    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    return(<div >
        <div className="navbar">    
            <NavLink className='navbar__link' to={SHOP_ROUTE}>
                <img className="navbar__logo" src={url_path}/>
                <div className="navbar__maintext">
                    Shop
                </div>
            </NavLink>
            
            {user.isAuth?
            <div className="navbar__auth">
                {user.user.email+' '+user.user.role}
                <button 
                    className='button_style' 
                    onClick={()=>navigate(BASKET_ROUTE)}
                    >
                        Basket
                    <span className="basket_count">
                        {basket.basketCount}
                    </span>
                </button>
                {user.user.role==='ADMIN'&&<button 
                    className='button_style' 
                    onClick={()=>navigate(ADMIN_ROUTE)}
                    >
                        Admin pannel
                </button>}
                <button 
                    className='button_style'
                    onClick={()=>{logOut()}}
                    >
                        Exit
                    </button>
            </div>
            :
            <div className="navbar__nonauth">
                <button 
                    className='button_style' 
                    onClick={()=>{navigate(LOGIN_ROUTE)}}
                    >
                        Login
                    </button>
            </div>
            }
        </div>
    </div>)
})

export default NavBar