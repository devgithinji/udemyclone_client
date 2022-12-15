import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {SyncOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useRouter} from "next/router";
import {Context} from "../context";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const {state: {user}, dispatch} = useContext(Context);

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/auth/register`, {email, password, name})
            toast.success('Registration successful please login')
            setEmail('')
            setName('')
            setPassword('')
        } catch (e) {
            toast.error(e.response.data)
        }
        setLoading(false)
    };

    return (
        <>
            <h1 className="jumbotron bg-primary square text-center">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4" value={name}
                           onChange={e => setName(e.target.value)} placeholder="enter name" required/>
                    <input type="text" className="form-control mb-4 p-4" value={email}
                           onChange={e => setEmail(e.target.value)} placeholder="enter email" required/>
                    <input type="password" className="form-control mb-4 p-4" value={password}
                           onChange={e => setPassword(e.target.value)} placeholder="enter password" required/>
                    <button type="submit" className="btn btn-block btn-primary"
                            disabled={!name || !email || !password || loading}>
                        {loading ? <SyncOutlined spin/> : 'Submit'}
                    </button>
                    <p className="text-center p-3">
                        Already Registered?
                        <Link href="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;