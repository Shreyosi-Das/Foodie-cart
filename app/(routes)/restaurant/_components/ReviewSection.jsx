import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'


function ReviewSection({restaurant}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
        <div className='flex flex-col gap-2 p-5 border rounded-lg shadow-lg'>
            <Textarea/>
            <Button>Submit</Button>
        </div>
        <div className='col-span-2'>
        <h2 className='font-bold text-lg'>Add your review</h2>
            
            List of review
        </div>
    </div>
  )
}

export default ReviewSection