import { useState , useRef } from "react";


import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./index.css"


const RegisterPage = () => {
    const navigate = useNavigate()
    const successRef = useRef(null)
    const [registerPageUserName, setRegisterPageUserName] = useState("")
    const [registerUserMailID, setRegisterUserMailID] = useState("")
    const [registerUserPassword, setRegisterUserPassword] = useState("")
    const [reEnterRegisteruserPassword, setReEnterRegisteruserPassword] = useState("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [registrationFailedMsg, SetRegistrationFailedMsg] = useState("")
    
    

    const onChangeRegisterPageUserName = (e) => {
        setRegisterPageUserName(e.target.value)
    };

    const onChangeUserMailID = (e) => {
        setRegisterUserMailID(e.target.value)
    };

    const onChangeUserPassword = (e) => {
        setRegisterUserPassword(e.target.value);
    };

    const onChangeUserReEnterPassword = (e) => {
        setReEnterRegisteruserPassword(e.target.value);
    };

    const SubmitRegisterUserDetails = async (e) => {
        e.preventDefault()
        if (registerUserPassword !== reEnterRegisteruserPassword) {
            setPasswordErrorMsg("Password Miss Match");
            return;
        }
        setPasswordErrorMsg("")
        SetRegistrationFailedMsg("")

        const NewRegisterUserDetails = {
            registerPageUserName,
            registerUserMailID,
            registerUserPassword,
        }
        console.log(NewRegisterUserDetails)

        try {
            const response = await api.post("/register_user", NewRegisterUserDetails)
            setSuccessMsg("User Register Successfully");
            successRef.current?.scrollIntoView({ behavior: "smooth" })
            setRegisterPageUserName("");
            setRegisterUserMailID("");
            setRegisterUserPassword("");
            setReEnterRegisteruserPassword("")
        } catch (error) {
            const msg = error.response?.data?.detail || "User Registration Failed . Try Again.";
            SetRegistrationFailedMsg(msg)
        }

    }


    return (
        <>
            <div className="register-page-main-bg-container">
                <h1>Welcome To Online Book Review System Please Register Your Details</h1>
                <div className="register-card-container">
                    <form className="register-details-form-container" onSubmit={SubmitRegisterUserDetails}>
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
                        <div className="register-user-password-container">
                            <label className="password-label" htmlFor="reEnterUserPassword">ReEnter Password</label>
                            <input
                                type="password"
                                placeholder="ReEnter Password"
                                className="user-password"
                                id="reEnterUserPassword"
                                value={reEnterRegisteruserPassword}
                                onChange={onChangeUserReEnterPassword}
                            />
                        </div>
                        {successMsg && (
                            <div className="go-to-login-button-container" ref={successRef}>
                                <p className="registation-success-message">{successMsg}</p>
                                <button className="go-to-login-button" onClick={() => navigate("/login_user")}>
                                    Go to Login
                                </button>
                            </div>
                        )}
                        <p>{passwordErrorMsg}</p>
                        <div className="register-page-submit-form-button-container">
                            <button className="register-page-submit-form-button" type="submit">
                                Register
                            </button>
                            <button className="register-page-submit-form-button" type="click" onClick={() => navigate("/login_user")}>
                               Login
                            </button>
                            <p>{registrationFailedMsg}</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default RegisterPage;













