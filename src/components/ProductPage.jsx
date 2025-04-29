import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./utils";
import { Notification } from "./utils";
// create custom hook to fetch dataList with 30 items(limit=30)
const useFetchAPI=()=>{
    const [dataList,setDataList]=useState({})
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        fetch('https://dummyjson.com/products?limit=30')
        .then((response)=>{
            if(!response.ok){
                throw new Error(`The server is Error: ${response.status}`)
            }
            return response.json()
        })
        .then((data)=>{
            setDataList(data)
        })
        .catch((err)=>{
            setError(err)
        })
        .finally(()=>{setLoading(false)})
    },[])
    return {dataList,error,loading}
}
// create custom hook to fetch a single item based on the id
const useFetchFixedAPI=(id)=>{
    const [data,setData]=useState({})
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`The server is Error: ${response.status}`)
            }
            return response.json()
        })
        .then((data)=>{
            setData(data)
        })
        .catch((err)=>{
            setError(err)
        })
        .finally(()=>{setLoading(false)})
    },[])
    return {data,error,loading}
}
//ProductPage component
function ProductPage(){
    const [notify,setNotify]=useState(false)
    const {addToCart}=useOutletContext();
    const {dataList,error,loading}=useFetchAPI();
    const [productName,setProductName]=useState('');
    const [filteredArray,setFilteredArray]=useState([])
    const [inputValue,setInputValue]=useState({})
    const navigate=useNavigate()
    const findProduct=(e)=>{
      setProductName(e.target.value)
    };
   //filter the dataList after finishes fetching and update on useState above
    useEffect(()=>{
        if(dataList.products){
            const filterArray=dataList.products.filter((item)=>{
            return ((item.title.toLowerCase().includes(productName.toLowerCase()))
                   ||
                   (item.category.toLowerCase().includes(productName.toLowerCase())))
        })
        setFilteredArray(filterArray)
    }
    },[dataList,productName])
    // update the current quantity value before clicking on addToCart btn
    const handleInputChange=(e,id)=>{
        setInputValue((prev)=>({
            ...prev,
            [id]:Number(e.target.value),
        }))
    }
   const toClose=()=>{
    console.log('hello')
    setNotify(false)
   }
   const fixedLength=(text,length)=>{
    return text.slice(0,length)+'...'
   }
    if(error) return <p>There are some Errors went on.</p>
    if(loading) return <LoadingPage/>
    //render jsx
    return(
        <>
           {notify && <Notification role='cart' closeNotification={toClose}/>}
           <h1 className="text-[2rem] font-bold text-center pt-5">This is the product page</h1>
           <div className="p-3">
           <input onChange={findProduct} type="text" placeholder="Search for items" className="text-[1.3rem] p-1 w-full border" />
           <ul className="flex flex-wrap gap-5 justify-center pt-5">
            {
            //if we dont type in searching box or when the filter array is blank, then in case the filter array have result
            //we will render the array,if not then render the dataList,otherwise in case we type in but no result, then render "there is no data"
            (productName==='' || filteredArray.length>0)?
            (filteredArray.length>0?filteredArray:dataList.products).map((item)=>(
                <li className="shadow-lg rounded-2xl p-4 w-60 flex flex-col">
                    <img className="w-50 h-50" src={item.thumbnail} alt="product's image" />
                    <h2 className="font-bold text-[1.3rem]">{item.title}</h2>
                    <h3>Price: {item.price}$</h3>
                    <p className="text-gray-400 text-[0.8rem]">{fixedLength(item.description,100)}</p>
                    <input className="border mt-auto" type="number" defaultValue="1" min="1" onChange={(e)=>handleInputChange(e,item.id)}/>
                    <div className="pt-3 mt-auto flex flex-row items-center justify-evenly">
                <button onClick={()=>{addToCart(item,inputValue),setNotify(true)}} className="text-white bg-orange-700 rounded-full py-0.5 px-3 cursor-pointer">Add To Cart</button>
                    <button onClick={()=>navigate(`/products/${item.id}`)} className="text-white bg-emerald-500 rounded-full py-1 px-3 cursor-pointer">More</button>
                    </div>
                  
                </li>
            ))
            :
            <p>There is no data.</p>
        }
           </ul>
           </div>
          
        </>
       
    )
}
export {ProductPage,useFetchFixedAPI,useFetchAPI}