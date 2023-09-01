import { useEffect, useState } from "react";
import axios from "../services/custominze_axios";

const useAuth = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [isAuth, setIsAuth] = useState(undefined);
  useEffect(() => {
    const token = localStorage.getItem("token") || false;
    if (token) {
      axios
        .post("/api/auth", "")
        .then((res) => {
          // console.log("check res: ", res);
          if (res.data) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
          // console.log(isAuth);
        });
    } else {
      setIsLoading(false);
      setIsAuth(false);
    }
  }, []);
  return [isAuth, isLoading];
};

export default useAuth;
