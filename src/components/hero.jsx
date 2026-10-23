import React from 'react'
import Button from './button'
import { useState, useRef, useEffect } from 'react'
import { TiLocation, TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  const nextVdref = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  }

  useEffect(() => {
    if (loadedVideos >= 2) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if(hasClicked){
      gsap.set('#next-video',{visibility: 'visible'})
      gsap.to('#next-video',{
        transformOrigin :'center center',
        scale: 1 ,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => {
          nextVdref.current.play();
        }
        
      })
      gsap.from('#current-video',{
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      })
    }
    
  }, {dependencies: [currentIndex],revertOnUpdate: true})

  useGSAP(()=>{
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    });
  })

  const upcomingVideo = (currentIndex % totalVideos) + 1;

  
   const handleVideoPlay = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideo);
   }
    const getNextVideo = (index) => `${import.meta.env.BASE_URL}videos/hero-${index}.mp4`


  return (
    <div className="relative h-screen w-screen overflow-x-hidden">

      {isLoading && (
        <div className='flex-center absolute inset-0 z-100 size-full bg-black'>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}



      <div id="video-frame" className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleVideoPlay} className='origin-center scale-50 opacity-0  transition-all duration-500 ease-in 
            hover:scale-100  hover:opacity-100'>
              <video
                src={getNextVideo(upcomingVideo)}
                loop
                muted
                autoPlay
                playsInline
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
                onError={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVdref}
            src={getNextVideo(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
            onError={handleVideoLoad}
            />
            <video
              src={getNextVideo(currentIndex)}
              autoPlay
              loop
              muted
              className='absolute left-0 top-0 size-full object-cover object-center'
              onLoadedData={handleVideoLoad}
              onError={handleVideoLoad}
            />
        </div>

        <h1 className='speacial-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>

        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-75'>redefi<b>n</b>e</h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame layer <br />
            Unleash your full potential</p>
            <Button  id= "watch-trailer" title="watch trailer" leftIcon={<TiLocationArrow/>} containerClassName="bg-yellow-300
            flex-center gap-1" />
          </div>
        </div>
      </div>

      <h1 className='speacial-font hero-heading absolute bottom-5 right-5 text-black'>
          G<b>a</b>ming
      </h1>

    </div>
  )
}

export default Hero