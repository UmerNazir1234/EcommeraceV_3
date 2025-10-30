import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLatterBox from '../Components/NewsLatterBox'

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'Us'} />
      </div>

      {/* Content */}
      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
        {/* Image with caption */}
        <div className="flex flex-col items-center md:items-start gap-4 md:max-w-[350px]">
          <img 
            className='w-full rounded-xl shadow-md' 
            src={assets.about_img} 
            alt="Our team working together" 
          />
          <p className="text-sm text-gray-500 italic text-center md:text-left">
            Our dedicated team collaborating to bring you the best products.
          </p>
        </div>

        {/* Text Section */}
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>
            We are passionate about delivering high-quality products that make
            your everyday life easier. Our mission is to blend innovation with
            simplicity, ensuring you get the best experience possible.
          </p>
          <p>
            With years of experience in the industry, our team works tirelessly
            to design and provide solutions that meet your needs. We value trust,
            transparency, and customer satisfaction above all.
          </p>
          <b className='text-gray-500'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore consectetur harum assumenda quis at quibusdam, porro molestiae debitis commodi, labore voluptas sed nulla eveniet repudiandae corporis! Illo, ab! Iste, consequuntur?</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row sm:mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eaque culpa magni labore, deserunt libero officia delectus quidem quia omnis eius aliquid eos explicabo fugiat, fuga ad, tempora nihil assumenda?</p>
        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eaque culpa magni labore, deserunt libero officia delectus quidem quia omnis eius aliquid eos explicabo fugiat, fuga ad, tempora nihil assumenda?</p>
        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Services</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eaque culpa magni labore, deserunt libero officia delectus quidem quia omnis eius aliquid eos explicabo fugiat, fuga ad, tempora nihil assumenda?</p>
        </div>

      </div>
      <NewsLatterBox/>
    </div>
  )
}

export default About
