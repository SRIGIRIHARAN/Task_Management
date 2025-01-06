import React from "react";
import { useNavigate } from "react-router-dom";
import task from "../../assests/images/task.svg";
import google from "../../assests/images/goolge.svg";
import loginimg1 from "../../assests/images/login-page-img.svg";
import loginimg2 from "../../assests/images/login-page-img-1.svg";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };

    return (
        <div className="login">
            <div className="row h-100">
                <div className="col-12">
                    <div className="login-wrapper">
                        <div className="login-wrapper-content">
                            <div className="login-wrapper-content-1">
                                <h1 className="h-text-1">
                                    <img src={task} width={32} height={32} alt="Text_Image" />
                                    TaskBuddy
                                </h1>
                                <p className="p-text-1">
                                    Streamline your workflow and track progress effortlessly<br />
                                    with our all-in-one task management app.
                                </p>
                            </div>
                            <button className="login-btn" onClick={handleGoogleSignIn}>
                                <img src={google} width={20} height={20} alt="Login_Button_Image" />
                                Continue with Google
                            </button>
                        </div>
                        <div className="login-wrapper-image">
                            <img src={loginimg1} className="login-image-1" width={591} height={662} alt="Login_Section_Image" />
                            <img src={loginimg2} className="login-image-2" width={834} height={834} alt="Login_Section_Image_1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
