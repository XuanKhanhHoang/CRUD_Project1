import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AppRouters from "./routes/AppRouters";
import { useDispatch } from "react-redux";
import { handleUserRefresh } from "./redux/actions/userAction";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(handleUserRefresh(token));
    }
  }, []);

  return (
    <div className="app-container">
      <AppRouters />
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
