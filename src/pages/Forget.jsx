import "../assets/css/login.css"
import Logo from '../assets/images/logo.png';
import { useState } from "react";
import useLoginShake from "../hooks/useLoginShake";
import { useNavigate } from 'react-router-dom';
import useMyToaster from '../hooks/useMyToaster';
import Cookies from 'js-cookie';

const Forget = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const shakeIt = useLoginShake();
  const navigate = useNavigate();
  const toast = useMyToaster();

  const formAction = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    for (let field of Object.keys(fields)) {
      if (fields[field] === '' || fields[field] === undefined || fields[field] === null) {
        shakeIt('loginBox');
        return;
      }
    }

    try {
      const url = process.env.REACT_APP_API_URL + "/user/login";
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const res = await req.json();
      if (req.status !== 200 || !res.login) {
        return toast(res.err, "error")
      }

      Cookies.set("token", res.token, {secure:true});
      navigate("/admin/dashboard")

    } catch (error) {
      console.log(error)
      return toast("Something went wrong", "error")
    }


  }

  return (
    <main className='login__main'>
      <img src={Logo} alt="Logo.png" className='mb-5' />
      <div className="login__box flex flex-col" id="loginBox">
        <form onSubmit={formAction}>
          <input type="emial" name="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='input_style' placeholder='Enter email'
          />
          <button className='button_style' onClick={() => navigate('/admin/otp')}>Forget</button>
        </form>
      </div>
    </main>
  )
}

export default Forget;