import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
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

function ProductPage(){
    const {dataList,error,loading}=useFetchAPI();
    const [productName,setProductName]=useState('');
    const [filteredArray,setFilteredArray]=useState([])
    const navigate=useNavigate()
    const findProduct=(e)=>{
      setProductName(e.target.value)
    };

    useEffect(()=>{
        if(dataList.products){
            const filterArray=dataList.products.filter((item)=>{
            return (item.title.toLowerCase().includes(productName.toLowerCase())
                   ||
                   item.category.toLowerCase().includes(productName.toLowerCase()))
        })
        setFilteredArray(filterArray)
    
      
      setFilteredArray(filterArray)
    }
    },[dataList,productName])
    if(error) return <p>There are some Errors went on.</p>
    if(loading) return <p>Loading...</p>
    return(
        <>
           <h1 className="text-[2rem] font-bold text-center pt-5">This is the product page</h1>
           <div className="p-3">
           <input onChange={findProduct} type="text" placeholder="Search for items" className="text-[1.3rem] p-1 w-full border" />
           <ul className="flex flex-wrap gap-5 justify-center pt-5">
            {
            (productName==='' || filteredArray.length>0)?
            (filteredArray.length>0?filteredArray:dataList.products).map((item)=>(
                <li className="border rounded-2xl p-4 w-65 flex flex-col">
                    <img className="w-50 h-50" src={item.thumbnail} alt="product's image" />
                    <h2 className="font-bold text-[1.3rem]">{item.title}</h2>
                    <h3>Price: {item.price}$</h3>
                    <p className="text-gray-400 text-[0.8rem]">{item.description}</p>
                    <div className="pt-3 mt-auto flex flex-row items-center justify-evenly">
                    <button className="text-white bg-orange-700 rounded-full py-0.5 px-1.5 cursor-pointer">Add To Cart</button>
                    <button onClick={()=>navigate(`/products/${item.id}`)} className="text-white bg-emerald-500 rounded-full py-o.5 px-1.5 cursor-pointer">More...</button>
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
export {ProductPage,useFetchFixedAPI}