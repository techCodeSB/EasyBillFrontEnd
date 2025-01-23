import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useMyToaster from '../hooks/useMyToaster';
import { use, useEffect, useState } from 'react';


const ProtectRoute = ({ children }) => {
  const toast = useMyToaster();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/admin")
      return toast("You need to login first", "error")
    }

    const checkToken = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/user/check-token";
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        });

        const res = await req.json();
        if (req.status === 500 || res.err) {
          navigate("/admin");
          return toast(res.err, "error");
        }

        setLoading(false)

      } catch (error) {
        console.log(error)
        navigate("/admin");
        return toast("Something went wrong", "error")
      }
    }

    checkToken();

  }, [])

  return (
    <>
      {loading ? <p></p> : children}
    </>
  )

}

const UnProtectRoute = ({ children }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard")
    }
  }, [token])

  return (
    <>
      {children}
    </>
  )
}

export { ProtectRoute, UnProtectRoute };

