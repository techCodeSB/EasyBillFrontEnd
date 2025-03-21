import "../../assets/css/login.css"
import Logo from '../../assets/images/logo.png';
import { useState } from "react";
import useLoginShake from "../../hooks/useLoginShake";
import { useNavigate } from 'react-router-dom';
import useMyToaster from "../../hooks/useMyToaster";
import Cookies from 'js-cookie';
import { MdEmail } from "react-icons/md";




const Otp = ({email}) => {
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

      Cookies.set("token", res.token, { secure: true });
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
        <div className="w-[50px] h-[50px] bg-[#0000001e] text-blue-500 rounded-full flex justify-center items-center mx-auto">
          <MdEmail className="text-2xl"/>
        </div>
        <p className="text-2xl font-bold text-center">OTP Verification</p>
        <p className="mb-8 text-center">
          Please enter your verification code we sent <br/>to {email}
        </p>
        <form onSubmit={formAction} className='flex gap-4 justify-center items-center'>
          <input type="text" name="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='otp__field'
          />
          <input type="text" name="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='otp__field'
          />
          <input type="text" name="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='otp__field'
          />
          <input type="text" name="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className='otp__field'
          />
        </form>
        <div className='flex justify-center'>
          <button
            className='bg-blue-500 p-3 rounded mt-7 text-white flex justify-center'
            onClick={() => navigate('/admin/change-password')}>Verify OTP</button>
        </div>
      </div>
    </main>
  )
}

export default Otp;