import React from 'react'
import "./Login.css";
import { Button } from '@mui/material';
import { auth,provider } from "./firebase";

function Login() {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((error)=>alert(error.message));
    }
  return (
    <div className="login">
        {/* <h2>login page</h2> */}
        <div className="login__logo">
            <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/b/b7/Discord_logo_svg.svg/2560px-Discord_logo_svg.svg.png" alt='' width="500" height="100" />
        </div>
        <h3>Sign in with Google Account</h3>
        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login