import { useEffect,useRef } from "react"

const SenderMessage = ({image,message}) => {
  const scroll=useRef()
  useEffect(() => {
   scroll?.current.scrollIntoView({behavior:"smooth"})
  }, [image,message])
  
  const handleImageScroll =()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})

  }
  return (
    <div className='bg-[#614e8a] text-white w-fit max-w-[300px]  px-2 py-2 rounded-2xl rounded-tr-none  flex flex-col gap-2 relative right-0 ml-auto' ref={scroll}>
        {image && <img src={image} alt="" className='w-[170px] rounded-2xl ' onLoad={handleImageScroll} />}
        {message &&<span>{message}</span> }
     
    </div>
  )
}

export default SenderMessage
