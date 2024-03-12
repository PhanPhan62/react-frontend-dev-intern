import "./App.css";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import AppRoute from "./routes/AppRoute";

function App() {
  const { loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <div className="App">
      <Header />
      <AppRoute />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
