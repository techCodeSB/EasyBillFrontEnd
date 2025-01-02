import "../assets/css/login.css"
import Logo from '../assets/images/logo.png';
import { useState } from "react";
// import useToast from "../hooks/useToast";
import useLoginShake from "../hooks/useLoginShake";



const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', pass: '' });
  // const toast = useToast();
  const shakeIt = useLoginShake();


  const formAction = (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    for (let field of Object.keys(fields)) {
      if (fields[field] === '' || fields[field] === undefined || fields[field] === null) {
        // toast('error', 'Please fill all fields');
        shakeIt('loginBox');
        return;
      }
    }

    
  }

  return (
    <main className='login__main'>
      <img src={Logo} alt="Logo.png" className='mb-5' />
      <div className="login__box flex flex-col" id="loginBox">
        <h1 className='text-center text-[25px] mb-8 mt-4'>Sign In</h1>
        <form onSubmit={formAction}>
          <input type="emial" name="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='input_style' placeholder='Enter email'
          />
          <input type="password" name="pass"
            value={loginData.pass}
            onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })}
            className='input_style' placeholder='Enter password'
          />
          <button className='button_style'>Sign in</button>
        </form>
      </div>
    </main>
  )
}

export default Login