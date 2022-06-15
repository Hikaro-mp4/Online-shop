import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "..";
// import '../styles/Pages.css'

const Pages=observer(({setPage,listLength,limit,page,len=7})=>{
    const countOfButton=Math.ceil(listLength/limit)
    console.log(listLength,limit,countOfButton,'count')
    const middle=Math.ceil(len/2)
   
    useEffect(()=>{
        listLength && page>=countOfButton && setPage(countOfButton-1)
    },[listLength])

    const handlerClick=(value)=>{
        setPage(value)
        window.scrollTo(0,0)
    }

    return (
        <div className="pagination">
            <button 
                className="pagination__button"
                onClick={()=>page>0 && handlerClick(0)}>
                {'<<'}
            </button>
            <button 
                className="pagination__button"
                onClick={()=>page>0 && handlerClick(page-1)}>
                {'<'}
            </button>
            {[...Array(countOfButton).keys()].map(el=>
                (
                    (
                        (page<middle+1 && el<len) ||
                        (page>middle-1 && el<page+middle)
                    ) &&
                        (
                            (countOfButton-page>middle && el>page-middle)||
                            el>countOfButton-len-1
                        )
                ) &&
                <button 
                    className={el===page?
                        'pagination__button active':
                        'pagination__button'}
                    key={el}
                    onClick={()=>page!=el && handlerClick(el)}>
                    {el+1}
                </button>)}
            <button 
                className="pagination__button"
                onClick={()=>page<countOfButton-1 && handlerClick(page+1)}>
                {'>'}
            </button>
            <button  
                className="pagination__button"
                onClick={()=>page<countOfButton-1 && handlerClick(countOfButton-1)}>
                {'>>'}
            </button>
        </div>
    )
})

export default Pages