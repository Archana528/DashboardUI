import React from 'react'

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import defaultAvatar from '../assets/images/portrait/avatar-s-11.jpg'
export default function Header() {
  return (
    <div style={{display:"flex", alignContent:'space-evenly'}}>
      <div style={{width:'50%',alignContent:"flex-start"}}>
        <h1 style ={{color:"#0E74BD"}}>
          Extropy
        </h1> 
        <h5 style ={{color:"#6AA9D6"}}>
          Data Labs
        </h5>     
      </div>
      <div style={{ width:'50%', display:"flex",  alignItems:'flex-end', justifyContent:'flex-end'}}>   
        <img height={50} src = {defaultAvatar}/>       
        <div>
          <div className='fw-bold'>John Smith</div>
          <div>Pricing Analyst</div>
        </div>
        <div></div>
        
      </div>     
    </div>
  )
}
