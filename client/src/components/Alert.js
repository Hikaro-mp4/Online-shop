import React, { useEffect, useMemo, useState } from 'react'

import '../styles/Alert/Alert.css'
const Alert = ({value,setValue}) => {
    const [time,setTime]=useState(0)

    useEffect(()=>{
        clearTimeout(time)
        setTime(setTimeout(()=>setValue(''),3000))
    },[value])

    return (
        <div className='alert'>
           {value}
            
        </div>
    )
}

export default Alert