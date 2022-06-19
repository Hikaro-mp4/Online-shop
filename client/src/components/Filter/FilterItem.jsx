import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../..'
import { deleteType, fetchTypes } from '../../http/deviceAPI'
import FilterEdit from '../../modals/FilterEdit'

const FilterItem = observer(({name,type,selectedType,setSelectedType}) => {

    const {user,device}=useContext(Context)
    const [active,setActive]=useState(false)

    const classActive=(id)=>{
         return selectedType.id===id?'filter__li active':'filter__li'
    }

    const handlerClick=(e,type)=>{
        e.stopPropagation()
        setSelectedType(type)
    }

    const handlerEdit=(e)=>{
        e.stopPropagation()
        setActive(true)
    }

    const handlerDelete=async()=>{
        console.log(type.id)
        await deleteType(type.id)   
        await fetchTypes().then(data=>{
            device.setTypes(data)
        })
    }

    return (
        <>
        <li 
            className={classActive(type.id)}
            key={type.id}
            onClick={(e)=>handlerClick(e,type)}
            >
                {type.name}
        </li>
        {user.user.role==='ADMIN' &&
            <>
            <button className='filter__button' onClick={handlerEdit}>edit</button>
            <FilterEdit active={active} setActive={setActive} name={name} edit={true} type={type}/>
            <button className='filter__button' onClick={handlerDelete}>X</button>
            </>
        }
        </>
        
    )
})

export default FilterItem