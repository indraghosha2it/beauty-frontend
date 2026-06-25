import React from 'react'
import HeroBanner from './HeroBanner.js'



import FeaturedProducts from './FeaturedProducts.js'

import Categories from './Categories.js'


import Navbar from '../layout/Navbar.js'
import Footer from '../layout/Footer.js'
import BigSaleSection from './BigSaleSection.js'
import WhyChooseUs from './WhyChooseUs.js'








export default function HomePage() {
  return (
     <>
     <Navbar />
      <HeroBanner />
       <Categories />
         <BigSaleSection />
         <FeaturedProducts />
         <WhyChooseUs />
       
     
            
             <Footer />

  
   
    </>
  )
}
