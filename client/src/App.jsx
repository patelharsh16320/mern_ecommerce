import Router from './routes/auth';
import { BrowserRouter } from "react-router-dom";
import './css/style.css';
import DefaultLayout from './layout/Default';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (

    <BrowserRouter>
      <ToastContainer />
      <DefaultLayout />
      <ToastContainer />
      <Router />
    </BrowserRouter>

  )
}

export default App