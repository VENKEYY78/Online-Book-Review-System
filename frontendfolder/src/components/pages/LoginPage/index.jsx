import { useState } from 'react';

import { useNavigate }from "react-router-dom"

import api from '../../services/api';

import './index.css'


const LoginPage = () => {

    const navigate = useNavigate();
    const [registerPageUserName, setRegisterPageUserName] = useState("")
    const [registerUserMailID, setRegisterUserMailID] = useState("")
    const [registerUserPassword, setRegisterUserPassword] = useState("")
    const [errorMsg , setErrorMsg] = useState("")


    const onChangeRegisterPageUserName = (e) => {
        setRegisterPageUserName(e.target.value)
    };

    const onChangeUserMailID = (e) => {
        setRegisterUserMailID(e.target.value)
    };

    const onChangeUserPassword = (e) => {
        setRegisterUserPassword(e.target.value);
    };


    const CheackUserDetails = async (e) => {
        e.preventDefault();
        setErrorMsg("")
        const NewRegisterUserDetails = {
            registerPageUserName,
            registerUserMailID,
            registerUserPassword,
        }
        console.log(NewRegisterUserDetails)

        try {
            const response = await api.post("/login_user", NewRegisterUserDetails)
            localStorage.setItem('token', response.data.token)
            setRegisterPageUserName("");
            setRegisterUserMailID("");
            setRegisterUserPassword("");
            navigate('/')
           
        } catch (error) {
            const msg = error.response?.data?.detail || "User Login Failed . Try Again.";
            setErrorMsg(msg)
        }

    }




    return (
        <>
            <div className='login-page-main-bg-container'>
                <h1 className='login-page-greet-heading'>Please Login Your Details</h1>
                <div className='user-login-details-container'>
                    <form className='login-details-form-container' onSubmit={CheackUserDetails} >
                    <div className="register-page-username-container">
                            <label className="username-label" htmlFor="RegisterPageusername">Username</label>
                            <input
                                type="text"
                                placeholder="Enter User Full Name"
                                className="username-input"
                                id="RegisterPageusername"
                                value={registerPageUserName}
                                onChange={onChangeRegisterPageUserName}
                            />
                        </div>
                        <div className="register-user-mail-id-container">
                            <label className="register-user-mail-label" htmlFor="registerUserMailID">Enter Mail ID</label>
                            <input
                                type="Email"
                                placeholder="Enter Mail ID"
                                className="mail-input-tag"
                                id="registerUserMailID"
                                value={registerUserMailID}
                                onChange={onChangeUserMailID}
                            />
                        </div>
                        <div className="register-user-password-container">
                            <label className="password-label" htmlFor="userPassword">Enter Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="user-password"
                                id="userPassword"
                                value={registerUserPassword}
                                onChange={onChangeUserPassword}
                            />
                        </div>
                        <div className='login-button-container'>
                            <button className='login-button' type='submit'>Login</button>
                            <button className='login-button' type='button' onClick={() => navigate("/register_user")}>Sign In</button>
                        </div>
                        <p>{ errorMsg }</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;