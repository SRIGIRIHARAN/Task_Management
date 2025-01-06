import React from 'react'
import task from '../../assests/images/task.svg';
import google from '../../assests/images/goolge.svg';

const Login = () => {
    return (
        <div className='login'>
            <div className='row h-100'>
                <div className='col-12'>
                    <div className="login-wrapper">
                        <div className="login-wrapper-content">
                            <div className="login-wrapper-content-1">
                                <h1 className='h-text-1'>
                                    <img src={task} width={32} height={32} alt='Text_Image' />
                                    TaskBuddy
                                </h1>
                                <p className='p-text-1'>Streamline your workflow and track progress effortlessly<br /> with our all-in-one task management app.</p>
                            </div>
                            <button className='login-btn'>
                                <img src={google} width={20} height={20} alt='Login_Button_Image' />
                                Continue with Google
                            </button>
                        </div>
                        <div className="login-wrapper-content"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login