import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './animatedTitle'

gsap.registerPlugin(ScrollTrigger);

const about = () => {
    useGSAP(()=>{
       const clipanimation = gsap.timeline({
        scrollTrigger: {
            trigger: '#clip',
            start: 'center center',
            end: '+=800 center',
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
        }
       })

       clipanimation.to('.mask-clip-path',{
        width:'100vw',
        height:'100vh',
        borderRadius: '0 0 0 0',
        ease: 'power1.inOut',
       })
    })
  return (
    <div id='about' 
    className=' min-h-screen w-screen'>
        <div className='relative  mb-8 mt-36 flex 
        flex-col flex-center gap-5'>
            <h2 className='font-general text-sm uppercase 
            md:text-[10px]'>
                welcome to zentery
            </h2>
            <AnimatedTitle title="discover the w<b>o</b>rld's largest <br /> shared ad<b>v</b>enture" containerClass="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]" />
            
            <div className='about-subtext'>
                <p>the game of games begins now</p>
                <p>Zentry unite every player from every corner of the world</p>
            </div>
        </div>
        <div className='h-dvh w-screen' id='clip'>
            <div className='mask-clip-path about-image'>
                <img src="./img/about.webp" alt="background"
                className='absolute left-0 top-0 size-full
                object-cover' />
            </div>
        </div>
    </div>
  )
}

export default about