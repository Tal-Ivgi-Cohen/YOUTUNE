import React from 'react'
import { SongApp } from './SongApp.jsx'
import { Hero } from '../cmps/Hero.jsx'

export const Home = () => {
    return (
        <section>
            <div className="home-section">
                <Hero />
            </div>
            <SongApp />
        </section>
    )
}
