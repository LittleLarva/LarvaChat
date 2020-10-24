import React from 'react'

import logoPng from './logo.png'
import './logo.less'

export default function logo(){
    return(
        <div className="logo-container">
            <img src={logoPng} alt="logo" className='logo-img'/>
        </div>
    )
}