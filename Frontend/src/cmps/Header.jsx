import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header =()=> {

        return (
            <header className="app-header">
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/song">Explore</NavLink> |
                    <NavLink to="/account/:tab?">Account</NavLink> 
                </nav>
            </header>
        )
}



