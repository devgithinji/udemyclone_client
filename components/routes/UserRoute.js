import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import axios from "axios";
import {SyncOutlined} from '@ant-design/icons'


const UserRoute = ({children}) => {
    const [ok, setOK] = useState(false)

    const fetchUser = async () => {
        try {
            const {data} = await axios.get("/api/auth/current-user")
            if (data.ok) setOK(true);

        } catch (e) {
            console.log(e)
            setOK(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            {!ok ? <SyncOutlined className="d-flex justify-content-center display-1 text-primary p-5"/> : (
                <>
                    {children}
                </>
            )}
        </>
    );
};

export default UserRoute;