import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import axios from "axios";
import {SyncOutlined} from '@ant-design/icons'
import UserNav from "../nav/UserNav";
import {useRouter} from "next/router";


const UserRoute = ({children}) => {
    const [ok, setOK] = useState(false)
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const {data} = await axios.get("/api/auth/current-user")
            if (data.ok) setOK(true);

        } catch (e) {
            console.log(e)
            setOK(false)
            router.push('/login')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            {!ok ? <SyncOutlined className="d-flex justify-content-center display-1 text-primary p-5"/> : (
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <UserNav/>
                            </div>
                            <div className="col-md-10">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UserRoute;