import { observer } from 'mobx-react-lite'
import React from 'react'
import { useState } from 'react'
import FilterItem from './FilterItem'

const Filter = observer(({device}) => {

    const[active,setActive]=useState(false)

    return (
        <div className='filter'>
            <div onClick={()=>setActive(prev=>!prev)} className="filter__open">Фильтры</div>
            <div onClick={()=>setActive(false)} className={active?"filter__menu active":"filter__menu"}>
                <FilterItem 
                    name='Types' 
                    types={device.types} 
                    selectedType={device.selectedType}
                    setSelectedType={device.setSelectedType.bind(device)}
                />
                <FilterItem 
                    name='Brands' 
                    types={device.brands} 
                    selectedType={device.selectedBrand}
                    setSelectedType={device.setSelectedBrand.bind(device)}
                    />
            </div>
        </div>
    )
})

export default Filter