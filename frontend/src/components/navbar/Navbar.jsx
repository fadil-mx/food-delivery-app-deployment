import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { storeContext } from '../../context/storeContext'
import axios from "axios"

function Navbar({ setShowlogin}) {
const [menu, setMenu] = React.useState("Home")

const {gettotal,token,settoken,url}=useContext(storeContext)

const navigate=useNavigate()

// const logout=()=>{
//   localStorage.removeItem("token")
//   settoken("")
//   navigate("/")
// }


const logout = async () => {
  try {
    await axios.post(url+'/api/user/logout', {});
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
  } catch (error) {
    console.error("Error logging out", error);
  }
};


  return (
    <div className='navbar'> 
       <Link to="/"><img src={assets.logo}  alt='logo' className='logo'/></Link>
       <ul className='navbar-menu'>
            <li> <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link></li>
            <a  href='#explore-menu'><li onClick={()=>{setMenu("Menu")}} className={menu==="Menu"?"active":""}>Menu</li></a>
            <a  href='#app-download'><li onClick={()=>{setMenu("Mobail-app")}} className={menu==="Mobail-app"?"active":""}>Mobail-app</li></a>
            <a  href='#footer'><li onClick={()=>{setMenu("Contact")}}className={menu==="Contact"?"active":""}>Contact</li></a>
       </ul>
       <div className='navbar-right'>
        <img src={assets.search_icon} alt='search' />
        <div className='navbar-search-icon'>
            <Link to="/cart"><img src={assets.basket_icon} alt='basket' /></Link>
            <div className='Dot'></div >
        </div>
        {!token?<button onClick={()=>setShowlogin(true)}>sign-in</button>:
        <div className="profile">
          <img src={assets.profile_icon} alt="profile" />
          <ul  className="nav-profile-dropdown">
           <Link to="/myorder"> <li ><img src={assets.bag_icon}/><p>order</p></li></Link>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
          </ul>
        </div>}
        
        
       </div>
    </div>
  )
}

export default Navbar
