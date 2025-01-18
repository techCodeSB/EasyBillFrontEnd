import Cookies from 'js-cookie';

const useApi = () => {
  const getApiData = async (model) => {
    try {
      const url = process.env.REACT_APP_API_URL + `/${model}/get`;
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ token: Cookies.get("token") })
      });
      const res = await req.json();
      return res;

    } catch (error) {
      console.log(error)
      return error;
    }
  }


  return { getApiData };
}

export default useApi;