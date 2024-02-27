import React from 'react'
import Slider from 'react-slick';
import slider1 from '../../images/slider1.jpg'
import slider2 from '../../images/slider2 (convert.io).jpg'
import slider3 from '../../images/slider3.jpg'
import slider4 from '../../images/slider4.jpg'
import slider5 from '../../images/slider5.jpg'
import slider6 from '../../images/slider6.jpg'
function Mainslider() {
  var settings={
    dots:true,
    infinite:true,
    speed:50,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:true,
    arrows:true
  };
  return (
    <>
       
      <Slider {...settings}>
          <img  src={slider4} alt="" />
          <img  src={slider3} alt="" />
          <img  src={slider2} alt="" />
          <img  src={slider1} alt="" />
          <img  src={slider5} alt="" />
          <img  src={slider6} alt="" />
    </Slider>
   
    </>
 
   
   
  )
}

export default Mainslider