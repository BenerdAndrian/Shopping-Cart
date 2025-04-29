import logoImg from '../assets/img/store.svg'
import PropTypes from 'prop-types'
import closeIcon from '../assets/img/closeIconn.svg'
function LoadingPage(){
    return(
        <div className="bg-blue-500 text-white text-center flex flex-row items-center justify-center w-screen h-screen fixed top-0 left-0">
         <img className="w-30 h-30 mr-5" src={logoImg}alt="logo" />
         <h1 className="font-bold text-[2.5rem]">Fetching Data...</h1>
        </div>
    )
}
function Notification({role='cart',closeNotification}){
   
    return (
        <>
        {role==='cart' && <div className='text-[0.8rem] bg-red-600 text-white md:py-5 md:px-9 rounded-2xl fixed top-2 left-1/2 transform -translate-x-1/2 px-3 py-4'>
            <img onClick={closeNotification} className=" w-3 h-3 absolute right-2 md:w-5 md:h-5 top-2 cursor-pointer " src={closeIcon} alt="icon" />
            <p className="text-center font-semibold mt-1">You've successfully added to cart.</p>
            </div>}
        {role==='checkout' && <div className='text-[0.8rem] bg-green-500 text-white md:py-4 md:px-9 rounded-2xl fixed top-2 left-1/2 transform -translate-x-1/2 px-3 py-4'>
            <img onClick={closeNotification}  className="w-3 h-3 absolute right-2 md:w-5 md:h-5 top-2 cursor-pointer " src={closeIcon} alt="icon" />
            <p className="text-center font-semibold mt-1">Check Out Successfully.</p>
            </div>}
        </>
    )
}
Notification.propTypes={
    role:PropTypes.string.isRequired,
}

export {LoadingPage,Notification}