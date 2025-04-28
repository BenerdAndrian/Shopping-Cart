import logoImg from '../assets/img/store.svg'
function LoadingPage(){
    return(
        <div className="bg-blue-500 text-white text-center flex flex-row items-center justify-center w-screen h-screen fixed top-0 left-0">
         <img className="w-30 h-30 mr-5" src={logoImg}alt="logo" />
         <h1 className="font-bold text-[2.5rem]">Fetching Data...</h1>
        </div>
    )
}
function notification(){
    
}
export {LoadingPage}