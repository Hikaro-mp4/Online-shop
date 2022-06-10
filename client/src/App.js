import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import { check } from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import './styles/App.css'
import './styles/scss/style.css'
import { getBasket } from "./http/basketAPI";

const App=observer(()=> {
  const {user,basket}=useContext(Context)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    check().then(data=>{
      user.setUser(data)
      user.setIsAuth(true)
      getBasket(data.id).then(dat=>{
        basket.setBasketCount(dat.count)
      })
    }).finally(()=>setLoading(false))
    console.log('and&')
   
  },[])
  return (
    <div className="App">
     <BrowserRouter>
     <NavBar/>
     <AppRouter/>
     </BrowserRouter>
    </div>
  );
})

export default App
