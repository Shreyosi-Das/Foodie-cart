import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BuisnessItem({buisness}) {
  return (
    <Link
    href={'/restaurant/'+buisness.slug}
    className='p-3
    hover:border rounded-xl
    hover:border-primary cursor-pointer transition-all duration-100 ease-in-out hover:bg-orange-50'>
        <Image src={buisness.banner?.url} alt={buisness.name}
        width={500}
        height={130}
        className='h-[130px] rounded-xl object-cover'/>
        <div className='mt-2'>
            <h2 className='font-bold text-lg'>{buisness.name}</h2>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Image src="/star.png" alt='star'
                    height={14}
                    width={14}/>
                    <label className='text-gray-400 text-sm'>4.5</label>
                    <h2 className='text-gray-400 text-sm'>{buisness.restroType[0]}</h2>
                </div>
                <h2 className='text-sm text-primary'>{buisness.categories[0].name}</h2>
            </div>
        </div>
    </Link>
    
  )
}

export default BuisnessItem