import React from 'react'

const button = ({id, title, leftIcon, containerClassName}) => {
  return (
    <button
    id={id}
    className={`flex-center gap-1 rounded-full px-6 py-2.5 text-xs font-semibold uppercase transition-all duration-300 ease-in-out hover:bg-yellow-100 ${containerClassName} cursor-pointer z-10`}
    >
      {leftIcon}
      {title}
    </button>
  )
}

export default button