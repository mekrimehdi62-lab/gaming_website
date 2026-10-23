import React, { useState, useRef } from 'react'





const BentoTilt = ({children, className}) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
   if(!itemRef.current) return;

   const {left,top,width,height} = itemRef.current.getBoundingClientRect();


  const relativeX = (e.clientX - left) / width;
  const relativeY = (e.clientY - top) / height;
  
  const tiltX = (relativeY - 0.5) * 10;
  const tiltY = (relativeX - 0.5) * -10;

  const newTransformStyle = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) `

  setTransformStyle(newTransformStyle);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  }
  return (
    <div className={className} ref={itemRef}
     onMouseMove={handleMouseMove} 
     onMouseLeave={handleMouseLeave} 
     style={{transform: transformStyle}}>
      {children}
    </div>
  )
}
const ToLocationArrow = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)


const BentoCard = ({src, title, description, isComingSoon}) => {
  return (
    <div className='relative size-full'>
      <video src={src} autoPlay loop muted className='absolute inset-0 h-full w-full object-cover object-center'/>
     
     <div className='relative z-10 flex size-full flex-col justify-between
     p-6 text-blue-50 '>
      <div>
        <h1 className='bento-title special-font'>{title}</h1>
        {description && <p className='bento-description mt-3 max-w-64 
        text-xs md:text-base
        '>{description}</p>}
       
      </div>
      
     </div>
      </div>
  )
}
const Features = () => {
  return (
    <section className='bg-black pb-52 '>
      <div className=' container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web
          text-blue-50
          text-lg
          '>Into the Metagame Layer</p>
        
        <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
          Immerse yourself in a dynamic ecosystem where creativity meets innovation. Discover a world of endless possibilities and unlock your full potential
        </p>
        </div>
      

      <div className='border-hsla relative mb-7 h-96 w-full 
      overflow-hidden rounded-md  md:h-[65vh]'>
        <BentoCard
        src="/videos/feature-1.mp4"
        title={<>radi<b>n</b>t</>}
        description=" A cross-platform tool for building beautiful, interactive web experiences"
        
       

        />

      </div>
      <div className='grid h-[135vh] grid-cols-2
      grid-rows-3 gap-7
      '>
        <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1
        md:row-span-2 '>
          <BentoCard
          src="/videos/feature-2.mp4"
          title={<>s<b>ig</b>ma</>}
          description=" A cross-platform tool for building beautiful, interactive web experiences"
         />
        </BentoTilt>

        <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1
        md:row-span-2 md:ms-0'>
          <BentoCard
          src="/videos/feature-3.mp4"
          title={<>n<b>e</b>xus</>}
          description=" A cross-platform tool for building beautiful, interactive web experiences"
         />
        </BentoTilt>
         <BentoTilt className='bento-tilt_1 me-14 md:col-span-1
        md:row-span-2 md:ms-0'>
          <BentoCard
          src="/videos/feature-4.mp4"
          title={<>a<b>z</b>e</>}
          description=" A cross-platform tool for building beautiful, interactive web experiences"
         />

        </BentoTilt>

        <BentoTilt className='bento-tilt_2'>
          <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
            <h1 className='bento-title special-font max-w-64 text-black'>
              more coming soon <b>yayy</b>
            </h1>
            <ToLocationArrow className='m-5 scale-[5] self-end'/>
            </div>
        </BentoTilt> 
        <BentoTilt className='bento-tilt_2'>
          <video src="/videos/feature-5.mp4" autoPlay loop muted 
          className='size-full object-cover object-center'/>
        </BentoTilt>
      </div>
      </div>
    </section>
  )
}

export default Features