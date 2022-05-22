import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Image from 'next/image';
const fadeImages = [
  {
    url: '/creative.png',
    caption: 'First Slide'
  },
  {
    url: '/creative1.png',
    caption: 'Second Slide'
  },
  {
    url: '/creative2.png',
    caption: 'Second Slide'
  },
  {
    url: '/creative3.png',
    caption: 'Second Slide'
  },
  {
    url: '/creative4.png',
    caption: 'Second Slide'
  },
];

export const Slider = () => {
  return (
    <div className='w-64'>
      <div className="slide-container">
        <Fade
          easing
          arrows={false}
          duration={800}
        >
          {fadeImages.map((fadeImage, index) => (
            <div className="each-fade" key={index}>
              <div className="image-container">
                <Image src={fadeImage.url} height={350} width={350} />
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  )
}