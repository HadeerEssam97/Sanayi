import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './forgot.css'
import { GovernomentContext } from '../Context/GovernorateContext'

export default function Forgotpassword() {
    const [email, setEmail] = useState("")
    const [errormsg, setErrormsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    let {notify} = useContext(GovernomentContext);
    function getData(e) {
        setEmail({
          email,
          [e.target.name]: e.target.value,
        });
      }
    async function forgotPassword(e) {
        setLoading(true)
        e.preventDefault()
        axios.post("http://localhost:5000/api/auth/forgot-password", email).then((res) => {
          console.log(res);
          setLoading(false);
          notify(res.data.message); 
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrormsg(err?.response?.data.message);
        })
    }
  return (
    <div className='log vh-100'>
    <h1 className="text-center fw-bold py-5 headLine headLine">Confirm your E-mail</h1>
    <div className="forgotForm p-5 wrapper rounded-4 mx-auto">
      {errormsg?.length? <h3 className='alert alert-danger'>{errormsg}</h3>:""}
      <form onSubmit={forgotPassword}>
        <label className='form-label  headLine fw-bold' htmlFor="email"><i class="fa-solid fa-envelope me-2"></i>E-mail</label>
        <input onChange={getData} className='form-control mb-3' type="email" id='email' name='email' placeholder="E-mail" />
        <div className="d-flex justify-content-center">
        <button type='submit' className="sub-Btn fw-bold btn bg-white rounded-5 w-50 p-3 mt-4">
        {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </button>
        </div>
      </form>
    </div>
    </div>
  )
}
