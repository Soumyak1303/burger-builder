import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
//heigth='80%'
const toolbar = (props) => (
    <header className='Toolbar'>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className='LogoWrapper'>
        <Logo/>
    </div>
    <nav className='DesktopOnly'>
    <NavigationItems/>
    </nav>   
    </header>
)

export default toolbar;
