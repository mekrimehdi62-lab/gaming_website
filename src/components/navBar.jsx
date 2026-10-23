import React, { useEffect, useRef ,useState} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './button'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const NavBar = () => {

    const [isAudioPlaying ,setIsAudioPlaying] = useState(false);
    const [isIndicatorActive ,setIsIndicatorActive] = useState(false);
    const navContainerRef = useRef(null);
    const navitems= ['Nexus','Vault','Prologue','About','Contact']
    const audioElementRef = useRef(null);
    const {y} = useWindowScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);


    useEffect(()=>{
       if(y === 0){
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
       }
       else if(y > lastScrollY){
        setIsNavVisible(false);
        navContainerRef.current.classList.remove('floating-nav');
       }
       else{
        setIsNavVisible(true);
        navContainerRef.current.classList.add('floating-nav');
       }
       setLastScrollY(y);
    },[y])

    const toggleAudioIndicator  = () =>{
        setIsAudioPlaying(prev => !prev);
        setIsIndicatorActive(prev => !prev);
    }
    useEffect(()=>{
        if(isAudioPlaying){
            audioElementRef.current.play();
        }
        else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying])

    useEffect(()=>{
        gsap.to(navContainerRef.current,{
            y: isNavVisible ? 0 : -100,
            duration: 0.5,
            ease: 'power2.inOut',
        })
    },[isNavVisible])
    
  return (
    <div ref={navContainerRef} className='fixed
     inset-0 top-4 z-50 h-16 border-none transition-all
     duration-700 sm:inset-x-6 sm:inset-y-4'>
        <header className='absolute top-0 w-full'>
            <nav className='flex-center size-full
            items-center justify-between p-4'>
                <div className='flex items-center gap-7'>
                    <img src={`${import.meta.env.BASE_URL}img/logo.jpg`} alt="logo"
                    className='w-10 rounded-full ' />
                    <Button
                        id="menu-btn"
                        title='product'
                        leftIcon={<TiLocationArrow/>}
                        containerClassName="hidden md:flex items-center gap-1 justify-center bg-blue-50"
                    />
                </div>
                <div className='flex h-full items-center'>
                    
                    <div className='hidden 
                    md:block'>
                        {navitems.map((item) => (
                           <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                            {item}
                           </a>
                        )) }
                    </div>
                    <button className='ml-10 flex items-center
                    space-x-0.5' onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className='
                        hidden
                        '
                        src={`${import.meta.env.BASE_URL}audio/B2.mp3`}
                        loop />
                            {[1,2,3,4].map((bar)=>(
                                <div key={bar} className={`indicator-line
                                ${isIndicatorActive ? 'active' : ''}`}
                                style={{
                                    animationDelay: `${bar * 0.1}s`,
                                    animationPlayState: isAudioPlaying ? 'running' : 'paused',
                                }}
                                />
                            ))}
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default NavBar