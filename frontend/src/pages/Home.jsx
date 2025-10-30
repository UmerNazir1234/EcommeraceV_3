import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
//import BestSaller from '../Components/BestSeller'
import BestSeller from '../Components/BestSeller'
import OurPolice from '../Components/OurPolice'
import NewsLatterBox from '../Components/NewsLatterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolice/>
      <NewsLatterBox/>
    </div>
  )
}

export default Home