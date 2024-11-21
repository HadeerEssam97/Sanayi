import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import './verify.css'
import { useNavigate } from 'react-router-dom';
import { GovernomentContext } from '../Context/GovernorateContext';

export default function EmailVerification() {

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

  let {setCheckVerify, notify, errormsg, setErrormsg}= useContext(GovernomentContext);
	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};
  function handleSubmit(e){
    e.preventDefault();
    const verificationCode = code.join("");
    setLoading(true);
    console.log(verificationCode);
    axios.post("http://localhost:5000/api/auth/verify-email", 
      { code: verificationCode },
      { withCredentials: true }
    )
    .then((res)=>{
        setCheckVerify(true);
        localStorage.setItem('checkVerify', 'true');
        setLoading(false);
        navigate("/login");
        notify(res.data.message);
        console.log(res);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
      setCheckVerify(false);
      localStorage.setItem('checkVerify', 'false');
      setErrormsg(err.response.data.message);
    })
}

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);
  return (
    <div className='log vh-100'>
    <h1 className="text-center fw-bold py-5 text-white">Verify Your Email</h1>
    <h6 className="text-center text-white mb-4">We sent you an email with a verification code. Please enter it here.</h6>
    <div className="codeForm p-5 wrapper rounded-4 mx-auto">
      {errormsg?.length? <h3 className='alert alert-danger'>{errormsg}</h3>:""}
      <form onSubmit={handleSubmit}>
      <div className="container d-flex justify-content-center flex-column align-items-center">
      <div className="row">
						{code.map((digit, index) => (
            <div className='col-md-2 box mt-3'>
							<input
								key={index}
                name='code'
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='form-control w-100'
							/>
            </div>
						))}
        </div>
        </div>
        <div className="d-flex justify-content-center">
        <button type='submit' className="sub-Btn fw-bold btn bg-white rounded-5 w-50 p-3 mt-5">
        {loading ? (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        'Confirm Code'
      )}
        </button>
        </div>
      </form>
      </div>
    </div>
  )
}
