'use client' 

import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h2 className='text-white text-xl'>Oopps went wrong!</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}