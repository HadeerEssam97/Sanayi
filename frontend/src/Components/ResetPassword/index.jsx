import axios from 'axios';
import './reset.css';
import Joi from 'joi';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GovernomentContext } from '../Context/GovernorateContext';

export default function ResetPassword() {
    let { resetToken } = useParams();
    const [formData, setFormData] = useState({ password: '', rePassword: '' });
    const [errorslist, setErrorslist] = useState([]);
    const [loading, setLoading] = useState(false);
    let { notify} = useContext(GovernomentContext);
    const navigate = useNavigate();

    function getData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function validateForm() {
        const schema = Joi.object({
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
            rePassword: Joi.any().valid(Joi.ref('password')).required().messages({
                'any.only': 'Passwords must match',
            }),
        });
        return schema.validate(formData, { abortEarly: false });
    }

    async function getNew(e) {
        e.preventDefault();
        setLoading(true);
        const validateResult = validateForm();
        if (validateResult.error) {
            setErrorslist(validateResult.error.details);
            setLoading(false);
            return; // Stop submission if validation fails
        }

            const { password } = formData;
            e.preventDefault(); // Only send the `password` field
            axios.post(
                `http://localhost:5000/api/auth/reset-password/${resetToken}`,
                { password }
            ).then((res) => {
              console.log(res);
              notify(res.data.message);
              setLoading(false);
            navigate('/login');
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setErrorslist([err.response.data.message]);
            });
    }
    return (
        <div className="log vh-100">
            <h1 className="text-center fw-bold py-5 headLine headLine">Reset Password</h1>
            <div className="resetForm w-50 p-5 wrapper rounded-4 mx-auto">
                {errorslist.map((err, index) => (
                    <h3 key={index} className="alert alert-danger">
                        {err.message}
                    </h3>
                ))}
                <form onSubmit={getNew}>
                    <label
                        className="form-label headLine fw-bold"
                        htmlFor="password"
                    >
                        <i className="fa-solid fa-lock me-2"></i>New Password
                    </label>
                    <input
                        onChange={getData}
                        className="form-control mb-3"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                    <label
                        className="form-label headLine fw-bold"
                        htmlFor="rePassword"
                    >
                        <i className="fa-solid fa-lock me-2"></i>Confirm New Password
                    </label>
                    <input
                        onChange={getData}
                        className="form-control mb-3"
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        placeholder="Confirm Password"
                    />
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="sub-Btn fw-bold btn bg-white rounded-5 w-50 p-3 mt-4"
                        >
                           {loading ? (
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            'Confirm Password'
          )}
                        </button>
                    </div>
                </form>
            </div>
            </div>
                );
}
