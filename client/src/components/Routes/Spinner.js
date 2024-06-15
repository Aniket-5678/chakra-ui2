import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path= "login"}) => {

  const [count, setCount] = useState(5)
  const navigate = useNavigate()
const location = useLocation()

  useEffect(()=> {

  const interval = setInterval(()=> {
    setCount((prevValue)=> --prevValue)

  }, 1000)
    count === 0 && navigate(`/${path}`, {
      state: location.pathname
    })
    return () => clearInterval(interval)
  }, [count, navigate, location, path])

  return (
    <div>
      
 <div>
    <h2>redirecting to you in {count} seconds</h2>
 <h1>loading....</h1>
 </div>

    </div>
  )
}

export default Spinner