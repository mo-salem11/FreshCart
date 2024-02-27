
import { Link } from 'react-router-dom';
import Slider from 'react-slick'



function CetagorySlider({data,onSendId,home}) {
  
   function sendId(productId){
    if(!home){
      onSendId({productId});
    }
    
    
  }

  var settings={
        dots:false,
        infinite:true,
        speed:50,
        slidesToShow:7,
        slidesToScroll:1,
        autoplay:false,
        arrows:false,
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
      <Slider style={{backgroundColor:"white"}} className='mt-4' {...settings}>
          {data?.map((data)=>{
            return (
              <Link key={data._id} to={'/categories'} onClick={()=>sendId(data?._id)}  className="text-decoration-none text-black">
                <div className='d-flex flex-column align-items-center cursor-pointer border-end' >   
                <img height={100} style={{borderRadius:"50%"}} className='w-50' src={data.image} alt="" />
                <h4 className='h6 w-50 text-center text-warp'>{data.name}</h4>
                 </div>
              
              </Link>
            
            )
          })}
     </Slider>
    </>
  )
}

export default CetagorySlider