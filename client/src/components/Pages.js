import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import '../styles/Pages.css'

const Pages=observer(()=>{
    const {device}=useContext(Context)
    const pageCount=Math.ceil(device.totalCount/device.limit)
    let pages=[]
    // console.log(device.totalCount,device.limit)
    for(let i=0;i<pageCount;i++){
        pages.push(i+1)
    }
    return(<div>
        {pages.map(page=>
        <button
            key={page}
            className="pages_btn"
            style={device.page===page? {backgroundColor:'black'}:{}}
            onClick={()=>{device.setPage(page);console.log(device.page)}}
        >
            {page}
        </button>
        )}
    </div>)
})

export default Pages