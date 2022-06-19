import { observer } from 'mobx-react-lite'
import React from 'react'
import { useState } from 'react'
import FilterItem from './FilterItem'
import FilterList from './FilterList'

const Filter = observer(({device}) => {

    const[active,setActive]=useState(false)

    return (
        <div className='filter'>
            <div 
                onClick={()=>setActive(prev=>!prev)} 
                className="filter__open"
                >
                    Фильтры
            </div>
            <div 
                onClick={()=>setActive(false)} 
                className={active?"filter__menu active":"filter__menu"}
                >
                <FilterList
                    name='Types' 
                    types={device.types} 
                    selectedType={device.selectedType}
                    setSelectedType={device.setSelectedType.bind(device)}
                />
                <FilterList
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