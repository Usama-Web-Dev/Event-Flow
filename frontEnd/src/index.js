import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Style/Util.css";
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {

              colorPrimary: ' #3954E4',//'#fe7f2d',//'#3954E4'
              colorBgBase:  'white ',           //'#f7f7f2',//F7FAFC or F7F7F7
              fontFamily: 'poppins'//poppins, inter, roboto, lato
              //  colorPrimary:  '#fe7f2d',//'#ee9b00',
              // colorBgBase: '#f7f7f2', // ffffff f8f9fa ffe5d9 '#fe7f2d','#fee440',
           
            },
          }}

        >

<ToastContainer/>          
            <App />
        </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);




