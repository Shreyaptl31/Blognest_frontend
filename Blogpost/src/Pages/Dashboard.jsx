import React from 'react'
import Header from '../Layout/Header'
import Slider from '../Components/Slider'
import BlogInfoCards from '../Components/Bloginfocard'
import BlogIntroCard from '../Components/BlogIntroCard'
import Footer from '../Layout/Footer'

const Dashboard = () => {
  return (
    <>
      <Header />
      <Slider />
      <BlogInfoCards />
      <BlogIntroCard />
      <Footer />
    </>
  )
}

export default Dashboard