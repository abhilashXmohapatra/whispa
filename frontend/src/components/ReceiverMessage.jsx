import { useEffect,useRef } from "react"


const ReceiverMessage = ({image,message}) => {
    const scroll=useRef()
    useEffect(() => {
     scroll?.current.scrollIntoView({behavior:"smooth"})
    }, [image,message])
     const handleImageScroll =()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})

  }
  return (
    <div className='bg-[#523f7a] text-white w-fit max-w-[300px]  px-2 py-2 rounded-2xl rounded-tl-none relative left-0 flex flex-col gap-2 'ref={scroll}>
            {image &&  <img src={image} alt="" className='w-[170px] rounded-2xl ' onLoad={handleImageScroll}/> }
           {message && <span>{message}</span> }
         
        </div>
  )
}

export default ReceiverMessage
