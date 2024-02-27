import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
function ProductsSlider({data}) {
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
                slidesToShow: 3,
              },
            },
          ],
      }; 
    return (
    <>
    <Slider style={{backgroundColor:"white"}}  className='mt-4' {...settings}>
    {data?.map((data)=>{
            return (
              <div className='d-flex flex-column align-items-center cursor-pointer border-end' key={data._id}>   
                <Link to={"/products/"+data._id} className="text-decoration-none text-black">
                <img height={100} style={{borderRadius:"50%"}} className='w-75 mx-auto' src={data.imageCover} alt="" />
                <div className='p-3'>
                            <span className='text-main'>{data.category.name}</span>
                            <h5>{data.title.split(' ').slice(0,2).join(' ')}</h5>
                            <div className='d-flex justify-content-between my-2'>
                              <div>{data.price} EGP</div>
                              <div><i className='fa-solid fa-star rating-color'></i>{data.ratingsAverage}</div>
                            </div>
                        </div>
                </Link>
              
            </div>
            )
          })} 
    </Slider>
    </>
  )
}

export default ProductsSlider