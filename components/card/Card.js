import React from 'react'
import Link from 'next/link'
import { Slider } from '../slideshow'

const Card = () => {
    return (
        <>
            <div className="w-full container max-w-5xl mx-auto flex flex-col items-center pt-4 ">
                <div className="flex flex-col items-center max-w-4xl w-full">
                    <div className="flex flex-col md:flex-row md:space-x-16 space-y-10 items-center mt-20 w-full">
                        <Slider />
                        <div className="flex flex-col md:items-start items-center justify-center text-center font-coiny  text-gray-100 px-4 md:px-0 py-10 mt-14  20">
                            <p className="mt-6 text-lg">
                                Creative Coding is a collection of 10 burning hot NFTs living in
                                the core of the blockchain collection made by Jorge Ochipinti, using canvas-sketch in javascript.
                                Our vision is to create an amazing project
                                that will shed light, joy, love, and creativity!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-20'>
                <Link href='/mint' passHref>
                    <button type="button" className=" 20 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go to Mint-Page!</button>
                </Link>
            </div>
        </>
    )
}

export default Card