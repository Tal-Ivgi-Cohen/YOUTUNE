import React from 'react'
import { SongApp } from '../art/SongApp.jsx'
//import { Link } from 'react-router-dom';
import { Hero } from '../../cmps/art/Hero.jsx'


export class Home extends React.Component {

    render() {
        return (
            <section>
                <div className="home-section">
                    <Hero/>
                </div>
               <SongApp />
                </section>
        )
    }
}
