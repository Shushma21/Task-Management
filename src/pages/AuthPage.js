import React, { useState } from "react";
import {auth,db} from "../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Authpages.css";

const AuthPage=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isSignUp,setIsSignUp] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleAuth = async(e)=>{
        e.preventDefault();
        setError("");

        try{
            if(isSignUp){
                const userCredential = await createUserWithEmailAndPassword(auth,email,password);
                const user = userCredential.user;

                await setDoc(doc(db,"users",user.uid),{
                    email:user.email,
                    createdAt: new Date(),
                });

                alert("Sign Up Successfully");
            }else{
                await signInWithEmailAndPassword(auth,email,password);
                alert("Login Successfully");
            }
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        }catch(error){
            alert(error.message);
            setEmail("");
            setPassword("");
        }
    };

    return(
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isSignUp?"Sign Up":"Sign In"}</h2>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleAuth}>
                    <input type="email" value={email} placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)} required/>
                    <input type="password" value={password} placeholder="Enter your password"onChange={(e)=> setPassword(e.target.value)} required/>
                    <button type="submit">{isSignUp?"Sign Up" : "Login"}</button>
                </form>
                <p>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button type="button" className="auth-toggle" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;