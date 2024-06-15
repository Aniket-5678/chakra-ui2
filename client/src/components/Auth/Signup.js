import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style/style.css"
import axios from "axios"
import toast from 'react-hot-toast'

const Signup = () => {
   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   const  navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            
            const res = await axios.post('/api/v1/auth/register', {name, email, password})

            if (res.data.success) {
                 toast.success(res.data && res.data.message)
                 navigate('/login')
            }
            

        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div className='signup-container'>
        <form onSubmit={handleSubmit} className='signup-main'>
          <h3>Signup</h3>
      
         <input type='text' placeholder='Enter your Name'  value={name} onChange={(e)=> setName(e.target.value)} />
         <input type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)} />
         <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}/>       
         
         <button type='submit'>Signup</button>
        
          
          <Link to='/login' >already have an Account plzz login?</Link>
        </form>
    </div>
  )
}

export default Signup