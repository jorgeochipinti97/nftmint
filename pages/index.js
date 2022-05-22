
const keccak256 = require('keccak256')
import { useEffect } from 'react'
import Card from '../components/card/Card'
import { Footer } from '../components/footer'
import Header from '../components/header/Header'
const WhiteList = require('../utils/whiteList/WhiteList')

export default function Home() {
  useEffect(() => {

    console.log(WhiteList.map(e => keccak256(e)))
  }
    , [])
  return (
    <>
      <div className="bg-[url('/blur.jpeg')]">
        <Header />
        <Card />
        <div className='mt-10'>
          <Footer />
        </div>
      </div>
    </>
  )
}