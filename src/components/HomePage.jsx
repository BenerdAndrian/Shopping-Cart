import image1 from '../assets/img/image1.jpg'
import image2 from '../assets/img/image2.jpg'
import image3 from '../assets/img/image3.jpg'
import prevIcon from '../assets/img/prevIcon.svg'
import nextIcon from '../assets/img/nextIcon.svg'
import { useState,useEffect } from 'react'
import { useFetchAPI } from './ProductPage'
function HomePage(){
    return(
    <>
    <ImageCarousel/>
    <ProductSlide/>
    </>
    )
}
function ProductSlide(){
    const categories=['beauty','furniture','fragrances','groceries']
    const {dataList,error,loading}=useFetchAPI();
    if(error) return <p>Error..</p>
    if(loading) return <p>Loading...</p>
    return(
        <section>
           
            {categories.map(type=>(
            <>
              <h2 className='text-[2rem] italic font-bold underline ml-2'>{type}</h2>
            <ul className="flex gap-x-2 p-2 justify-center">
            {dataList.products.map((item,index)=>(
            (item.category===type && index<4) && <li className="p2 border">
            <img src={item.thumbnail} alt="img" className="w-30 h-30" />
            <p className="font-bold text-black text-[1.5rem]">{item.title}</p>
            <p>{item.price}$</p>
            <p className="text-gray-400 text-[0.9rem]">{item.description}</p>
            </li>
             
            ))}
            <button>
            <img className="w-10 h-10" src={prevIcon} alt="previous" />
            </button>
            <button>
            <img className="w-10 h-10" src={nextIcon} alt="next" />
            </button>
</ul>
            
            </>
            ))}
           
        </section> 
    )
}
function ImageCarousel(){
    const images=[image1,image2,image3]
    const [currImg,setCurrImg]=useState(0);
    const handlePrevImg=()=>{
        if(currImg>0) setCurrImg(currImg=> currImg-1)
        if(currImg===0) setCurrImg(images.length-1)
    }
    const handleNextImg=()=>{
        if(currImg<images.length-1) setCurrImg(currImg=>currImg+1)
        if(currImg===images.length-1) setCurrImg(0)
    }
    
    useEffect(()=>{
        const intervalId=setInterval(()=>{
            setCurrImg((currImg)=>{
              if(currImg<images.length-1) return currImg+1
              if(currImg===images.length-1) return currImg-currImg;
              return currImg
            })
        },4000)
        return ()=>clearInterval(intervalId)
    },[])
    return(
     <>
     <div className=" relative">
        <img className="h-[70vh] w-full object-cover transition-all duration-500 ease-in-out transform" src={images[currImg]} alt="image" />
        <button onClick={handlePrevImg} className="absolute left-0 top-40 cursor-pointer">
            <img className="w-20 h-20" src={prevIcon} alt="previous" />
        </button>
        <button onClick={handleNextImg} className="absolute right-0 top-40 cursor-pointer">
            <img className="w-20 h-20" src={nextIcon} alt="next" />
        </button>
        <ul className="flex items-center justify-evenly absolute bottom-2 w-30">
            {images.map((image,index)=>(
                <li onClick={()=>setCurrImg(index)} className={`cursor-pointer w-5 h-5 p-1 rounded-full ${currImg===index?'bg-white':'bg-gray-300'}`}></li>
            ))}
        </ul>
     </div>
     <h1 className="text-[2rem] font-bold text-center pt-5">This is the Homepage</h1>
     </>
    )
}
export {HomePage}