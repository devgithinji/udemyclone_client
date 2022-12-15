import React, {useContext, useEffect} from 'react';
import {Context} from "../../context";
import axios from "axios";
import {LOGIN} from "../../context/actions";
import {SyncOutlined} from "@ant-design/icons";

const Callback = () => {
    const {state: {user}, dispatch} = useContext(Context)

    const fetchInstructor = async () => {
        const {data} = await axios.post('/api/get-account-status');
        dispatch({
            type: LOGIN,
            payload: data
        })
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = '/instructor'
    }
    useEffect(() => {
        fetchInstructor();
    }, [])
    return (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5"></SyncOutlined>
    );
};

export default Callback;