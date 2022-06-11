import { observer } from 'mobx-react-lite'
import React from 'react'

const FilterItem = observer(({name,types,selectedType,setSelectedType}) => {

    const handlerReset=()=>{
        setSelectedType(0)
    }

    const classActive=(id)=>{
         return selectedType.id===id?'filter__li active':'filter__li'
    }

    const handlerClick=(el)=>{
        setSelectedType(el)
    }

    return (
        <div onClick={e=>e.stopPropagation()} className='filter__item'>
            <div className='filter__name'>
                {name}
            </div>
            <ul className="filter__list">
                {types.map(el=><li 
                    className={classActive(el.id)}
                    key={el.id}
                    onClick={()=>handlerClick(el)}
                    >
                    {el.name}
                </li>)}
            </ul>
            {selectedType.id &&
             <div className='filter__reset'
                onClick={handlerReset}
             >сброс</div>}
        </div>
    )
})

export default FilterItem