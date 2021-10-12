import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx/Auxx';
//height='11%'
const sideDrawer =(props)=>{
let classes = ['SideDrawer', 'Close'];
 if(props.open) {
    classes=['SideDrawer','Open']
 }
    return(
    <Auxx>
     <Backdrop show={props.open} clicked={props.closed} />
     <div className={classes.join(' ')}>
        <div className='LogoWrapper'>
        <Logo/>
        </div> 
        <nav>
            <NavigationItems/>
        </nav>
     </div>
    </Auxx>
   );
}

export default sideDrawer;
