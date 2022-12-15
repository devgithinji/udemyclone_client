import React, {useContext, useState} from 'react';
import {Button} from "antd";
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from "@ant-design/icons"
import {toast} from "react-toastify";
import {Context} from "../../context";
import axios from "axios";
import {useRouter} from "next/router";


const BecomeInstructor = () => {
    const [loading, setLoading] = useState(false);
    const {state: {user}} = useContext(Context)
    const router = useRouter()


    const becomeInstructor = async () => {
        try {
            setLoading(true)
            const {data} = await axios.post('/api/make-instructor')
            console.log(data)
            router.push(data)
        } catch (e) {
            console.log(e.response.status)
            toast.error('Stripe onboarding failed! Try again.')
        }
        setLoading(false)
    }
    return (
        <>
            <h1 className="jumbotron text-center square">Become Instructor</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="pt-4">
                            <UserSwitchOutlined className="display-1 pb-3"/>
                            <br/>
                            <h2>Set Payout to publish courses on UdemyClone</h2>
                            <p className="text-warning">
                                Udemy Partners with Stripe to transfer earnings to your bank account
                            </p>

                            <Button className="mb-3" type="primary" block shape="round"
                                    icon={loading ? <LoadingOutlined/> : <SettingOutlined/>}
                                    size="large" onClick={becomeInstructor}
                                    disabled={user && user.role && user.role.includes("instructor") || loading}>
                                {loading ? "Processing" : "Payout Setup"}
                            </Button>

                            <p className="lead">You will be redirected to stripe to complete onboarding process</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BecomeInstructor;