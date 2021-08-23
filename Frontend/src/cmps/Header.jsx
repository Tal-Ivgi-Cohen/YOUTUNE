import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header =()=> {

        return (
            <header className="app-header">
                <h1 className="logo">YOUTUNE</h1>
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/song">Explore</NavLink> |
                    <NavLink to="/account/:tab?">Account</NavLink> 
                </nav>
            </header>
        )
}



