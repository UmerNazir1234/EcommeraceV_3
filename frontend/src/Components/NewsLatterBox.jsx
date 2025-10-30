import React from 'react'

const NewsLatterBox = () => {
    const onSubmithandler =(event)=>{
        event.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off </p>
        <p className='text-gray-500 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, voluptatum porro. Omnis nostrum perferendis, ex explicabo eaque odio dolore at delectus esse nemo libero in deleniti quis sapiente, nisi perspiciatis.</p>
        <form onSubmit={onSubmithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border p1-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter the email' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLatterBox