import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../..'
import FilterEdit from '../../modals/FilterEdit'
import FilterItem from './FilterItem'

const FilterList = observer(({name,types,selectedType,setSelectedType}) => {

    const {user}=useContext(Context)
    const [active,setActive]=useState(false)

    const handlerReset=()=>{
        setSelectedType(0)
    }
    return (
        <div >
           
            <div className='filter__name'>
                {name}
                {user.user.role==='ADMIN' &&
                    <>
                        <button className='filter__button' onClick={()=>setActive(true)}>create</button>
                        <FilterEdit active={active} setActive={setActive} name={name}/>
                    </>
                }
                    
            </div>
            <ul className="filter__list">
                {types.map(type=>
                    <FilterItem  
                        key={type.id}
                        name={name}
                        type={type} 
                        selectedType={selectedType} 
                        setSelectedType={setSelectedType}
                    />
                )}
            </ul>
            {selectedType.id &&
             <div className='filter__reset'
                onClick={handlerReset}
             >сброс</div>}
            
        </div>
    )
})

export default FilterList