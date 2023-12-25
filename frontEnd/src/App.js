import "./App.css";
import "antd/dist/reset.css";
import "./Style/Util.css";
import 'react-quill/dist/quill.snow.css';
import ThemeLayout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";

import ForgotPassword from './Auth/ForgotPassword'
import VerificationCode from "./Auth/VerificationCode";


function App() {
  return(
    <>
    <Routes>
    <Route path="Login" element= {    <Login /> } />
    <Route path="/forgot-password" element={<ForgotPassword/> }/>
    <Route path="/reset-password" element= {<ResetPassword/>} />
    <Route path="/verification-code" element= { <VerificationCode/>} />
    
    {/* <Route path="Practice" element= {<Practice/>} /> */}
      <Route path="*" element= { <ThemeLayout /> } />
    </Routes>
    </>
  )

}
export default App;
