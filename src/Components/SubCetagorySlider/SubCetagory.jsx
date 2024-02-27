import React from 'react'
import Slider from 'react-slick';
export default function SubCetagory({data,onSendId}) {
  function sendId(productId){
    //  console.log(productId);
    onSendId(productId);
  }  
  
  var settings={
        dots:false,
        infinite:true,
        speed:50,
        slidesToShow:7,
        slidesToScroll:1,
        autoplay:false,
        arrows:true,
        responsive: [
            {
              breakpoint: 1200, // screens smaller than 1200px
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 992, // screens smaller than 992px
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 768, // screens smaller than 768px
              settings: {
                slidesToShow: 2,
              },
            },
          ],
      }; 
 
    return (
    <>
      <Slider className='my-3' {...settings}>
        
          {data?.map((data)=>{
            return (
                <div onClick={()=>sendId(data._id)} key={data?._id}  className='cursor-pointer text-center'>
                     <span style={{borderRadius:'20px'}}  className='text-muted bg-main-light p-2  text-nowrap'>{data?.name.split(' ').slice(0, 3).join(' ')}</span>
                </div>
            )
          })}
      </Slider>
    </>
  )
}
