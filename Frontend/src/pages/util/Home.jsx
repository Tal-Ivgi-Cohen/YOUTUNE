import React from 'react'
import { SongApp } from '../art/SongApp.jsx'
import { Hero } from '../../cmps/art/Hero.jsx'

export function Home() {
    return (
        <section>
            <div className="home-section">
                <Hero />
            </div>
            <SongApp />
        </section>
    )
}
