import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'

import React from 'react';
import TopNav from "../components/TopNav";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from "../context";

const MyApp = ({Component, pageProps}) => {
    return (
        <Provider>
            <TopNav/>
            <Component {...pageProps}/>
            <ToastContainer position="top-center"/>
        </Provider>
    );
};

export default MyApp;