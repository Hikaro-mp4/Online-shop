import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Context } from '..'
import {    createBrand, 
            createType, 
            fetchBrands, 
            fetchTypes, 
            updateBrand, 
            updateType } from '../http/deviceAPI'

const FilterEdit = observer(({active,setActive,name,edit=false,type}) => {

    const{device}=useContext(Context)

    const [value,setValue]=useState('')

    useEffect(()=>{
        edit && console.log('test',type.name)
        edit && setValue(type.name)
    },[active])

    const update=async()=>{
        if(!edit){
            switch(name){
                case 'Types':
                    await createType({name:value}).then(data=>{  
                        setValue('')
                        setActive(false)
                    })
                    break

                case 'Brands':
                    await createBrand({name:value}).then(data=>{
                        setValue('')
                        setActive(false)
                    })
                    break
            }
        }
        else{
            switch(name){
                case 'Types':
                    await updateType({id:type.id,name:value}).then(()=>{
                        setValue('')
                        setActive(false)
                    })
                    break
                
                case 'Brands':
                    await updateBrand({id:type.id,name:value}).then(()=>{
                        setValue('')
                        setActive(false)
                    })
                    break            
            }
        }

        switch(name){
            case 'Types':
                await fetchTypes().then(data=>{  
                    device.setTypes(data)})
                break
            
            case 'Brands':
                await fetchBrands().then(data=>{
                    device.setBrands(data)})
                    break
            
        }
    }
    return (
        <>
            {active && <div 
                onClick={()=>setActive(false)} className='filter-edit'>
                <div 
                    onClick={e=>e.stopPropagation()} className="filter-edit__content">
                    <h1>{name}</h1>
                    <input 
                        value={value} 
                        onChange={e=>setValue(e.target.value)} 
                        type="text" 
                        className='filter-edit__input'
                    />
                    <button 
                        onClick={update} 
                        className='filter-edit__button'>{edit?'edit':'add'}
                    </button>
                </div>
            </div>}
        </>
    )
})

export default FilterEdit