import React, {useContext, useEffect, useState} from 'react';
import {SyncOutlined} from '@ant-design/icons'
import {Context} from "../context";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import axios from "axios";
import Link from "next/link";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //context
    const {state: {user}} = useContext(Context)
    //router
    const router = useRouter();
    //redirect if user is logged in
    useEffect(() => {
        if (user !== null) return router.push('/')
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const {data} = await axios.post("/api/auth/forgot-password", {email})
            toast('Check your email for the secret code')
            setSuccess(true)
        } catch (e) {
            toast.error(e.response.data);
        }
        setLoading(false)
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const {data} = await axios.post('/api/auth/reset-password', {email, code, newPassword})
            setEmail('')
            setNewPassword('')
            setCode('')
            setLoading(false)
            toast('Great ! You can login with your new password')
        } catch (e) {
            toast.error(e.response.data);
        }
        setLoading(false)
    }
    return (
        <>
            <h1 className="jumbotron bg-primary square text-center">Forgot Password</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={success ? handlePasswordReset : handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4" value={email}
                           onChange={e => setEmail(e.target.value)} placeholder="enter email" required/>
                    {success && (
                        <>
                            <input type="text" className="form-control mb-4 p-4" value={code}
                                   onChange={e => setCode(e.target.value)} placeholder="enter secret code" required/>
                            <input type="password" className="form-control mb-4 p-4" value={newPassword}
                                   onChange={e => setNewPassword(e.target.value)} placeholder="enter new Password"
                                   required/>
                        </>
                    )}
                    <button type="submit" className="btn btn-block btn-primary"
                            disabled={!email || loading}>
                        {loading ? <SyncOutlined spin/> : 'Submit'}
                    </button>
                    <p className="text-center pt-3 text-danger">
                        Remember Password?
                        <Link href="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;