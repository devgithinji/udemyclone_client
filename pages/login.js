import React, {useContext, useEffect, useState} from 'react';
import {SyncOutlined} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import {toast} from "react-toastify";
import {Context} from "../context";
import {LOGIN} from "../context/actions";
import {useRouter} from "next/router";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const {state: {user}, dispatch} = useContext(Context);
    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/auth/login`, {email, password})
            toast.success('Login successful please login')
            dispatch({
                type: LOGIN,
                payload: data
            })
            //save in local storage
            localStorage.setItem("user", JSON.stringify(data))
            //router
            router.push('/user')
        } catch (e) {
            toast.error(e.response.data)
        }
        setLoading(false)
    };

    return (
        <>
            <h1 className="jumbotron bg-primary square text-center">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4" value={email}
                           onChange={e => setEmail(e.target.value)} placeholder="enter email" required/>
                    <input type="password" className="form-control mb-4 p-4" value={password}
                           onChange={e => setPassword(e.target.value)} placeholder="enter password" required/>
                    <button type="submit" className="btn btn-block btn-primary"
                            disabled={!email || !password || loading}>
                        {loading ? <SyncOutlined spin/> : 'Submit'}
                    </button>
                    <p className="text-center pt-3 text-danger">
                        Don't have account?
                        <Link href="/register"> Register</Link>
                    </p>
                    <p className="text-center pt-3">
                        <Link href="/forgot-password" className="text-danger"> Forgot password</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;