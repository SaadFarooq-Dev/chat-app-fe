import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 const Auth = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if((localStorage.getItem('JWT'))){
      navigate('/chat')
    }
  }, []);

  const handleLogin = async (e) =>{
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      await axios.post('http://localhost:4000/api/auth',{
      email: email,
      password: password
    }).then(res => {
      localStorage.setItem('JWT',res.data.token)
      navigate('/chat')
    })
    } catch (error) {
      console.log(error)
    }
  }

 return (
  <div className='Auth-form-container'>
   <form className='Auth-form' onSubmit={handleLogin}>
    <div className='Auth-form-content'>
     <h3 className='Auth-form-title'>Sign In</h3>
     <div className='form-group mt-3'>
      <label>Email address</label>
      <input
       type='email'
       id='email'
       name='email'
       className='form-control mt-1'
       placeholder='Enter email'
      />
     </div>
     <div className='form-group mt-3'>
      <label>Password</label>
      <input
       type='password'
       className='form-control mt-1'
       placeholder='Enter password'
      />
     </div>
     <div className='d-grid gap-2 mt-3'>
      <button type='submit' className='btn btn-primary'>
       Login
      </button>
     </div>
     <p className='forgot-password text-right mt-2'>
      Forgot <a href='#'>password?</a>
     </p>
    </div>
   </form>
  </div>
 );
}
export default Auth
