import React from 'react'
import './index.css'
import Hero from './components/hero'
import About from './components/about'
import NavBar from './components/navBar'
import Features from './components/Features'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <NavBar />
      <Hero />
      <About />
      <Features />
        
      
    </main>
  )
}

export default App