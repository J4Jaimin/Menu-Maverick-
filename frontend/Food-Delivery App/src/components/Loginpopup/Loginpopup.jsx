import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets';
import './loginpopup.css';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Loginpopup = ({ setIsLogin }) => {

    const [currState, setCurrState] = useState("login");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { url, setToken } = useContext(StoreContext);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUser(user => ({ ...user, [name]: value }));
    }

    // useEffect(() => {
    //     console.log(currState);
    // }, [currState])

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currState === 'login') {
            newUrl += '/api/user/login';
        }
        else {
            newUrl += '/api/user/register'
        }

        try {
            const response = await axios.post(newUrl, user);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setIsLogin(false);

                if (newUrl.endsWith('login')) {
                    toast.success("Logged in successfully!");
                }
                else {
                    toast.success("New acccount has been created.");
                }
            }
            else {
                toast.error(response.data.message, {
                    position: 'top-center'
                });
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setIsLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className='login-popup-inputs'>
                    {currState === 'Sign Up' ? <input type='text' onChange={onChangeHandler} name='name' value={user.name} placeholder='Your name' required /> : <></>}
                    <input type='email' placeholder='Your email' onChange={onChangeHandler} name='email' value={user.email} required />
                    <input type='password' placeholder='Password' onChange={onChangeHandler} name='password' value={user.password} required />
                </div>
                <button>{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'login' ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('login')}>Login here</span></p>
                }

            </form>
        </div>
    )
}

export default Loginpopup;