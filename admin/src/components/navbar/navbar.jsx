import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'

const navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo'/>
        <img src={assets.profile_image} className='icon'/>
    </div>
  )
}

export default navbar
   