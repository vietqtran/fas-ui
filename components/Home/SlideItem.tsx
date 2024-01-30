import Image from 'next/image'
import React from 'react'

interface Props {
   src: string
}

const SlideItem = ({ src }: Props) => {
   return (
      <div className='h-full w-full'>
         <Image
            alt='slide image'
            src={src}
            width={2000}
            height={2000}
            className='h-full w-full object-contain'
         />
      </div>
   )
}

export default SlideItem
