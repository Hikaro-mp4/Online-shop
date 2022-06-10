import React, { useContext } from "react";
import {Switch,Route,Redirect, Routes} from 'react-router-dom'
import { Context } from "..";
import { authRoutes,publicRoutes } from "../routes";



const AppRouter=()=>{
   const {user}=useContext(Context)
    console.log(user)
    return(
    //     <div>
    //          {publicRoutes.map(({path,Component})=>{
    //              console.log(Component)
    //   })}
    //     </div>
    
     <Routes>   
        
        {user.isAuth && authRoutes.map(({path,Component})=>
            <Route key={path} path={path} element={<Component/>}/>
        )}
        {publicRoutes.map(({path,Component})=>
            <Route key={path} path={path} element={<Component/>}/>
        )}
       
    </Routes>
    )
}

export default AppRouter