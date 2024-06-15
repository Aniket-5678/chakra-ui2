import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../style/style.css"
import axios from "axios"
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
      const  navigate = useNavigate()
      const [auth, setAuth] = useAuth()

      const location = useLocation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            
            const res = await axios.post('/api/v1/auth/login', { email, password})
               
            if (res.data.success) {
                 toast.success(res.data && res.data.message)
                 navigate('/login')

                 setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token
                 })
                 localStorage.setItem('auth', JSON.stringify(res.data))
                 navigate( location.state ||'/dashboard/user')

            }
            

        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div className='signup-container'>
    <form onSubmit={handleSubmit} className='signup-main'>
      <h3>Login</h3>
  
     <input type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)} />
     <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}/>       
     
     <button type='submit'>Login</button>
    
      
      <Link to='/' > Do not have an Account Signup?</Link>
    </form>
</div>
  )
}

export default Login