import { add } from "../store/userDetailSlice";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';


// run instend when login success;
const useGetUserData = () => {
  const dispatch = useDispatch();

  const getProfile = async () => {
    const url = process.env.REACT_APP_API_URL + "/user/get-user";
    const cookie = Cookies.get("token");

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ token: cookie })
    })
    const res = await req.json();
    dispatch(add(res))
  }

  return getProfile;

}

export default useGetUserData;
