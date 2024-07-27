import React from 'react'
import './home.css'
import Header from '../../components/header/header'
import ExploreMenu from '../../components/exploremenu/exploremenu'
import Fooddisplay from '../../components/fooddislpay/fooddisplay'
import Appdownload from '../../components/appdownload/appdownload'


const home = () => {

  const [catagory, setCatagory] = React.useState('all')

  return (
    <div>
      <Header/>
      <ExploreMenu
      catagory={catagory}
      setCatagory={setCatagory} 
      />
      <Fooddisplay
       catagory={catagory}
       setCatagory={setCatagory}
        />
        <Appdownload/>
    </div>
  )
}

export default home
