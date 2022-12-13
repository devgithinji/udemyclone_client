import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";


const Index = () => {
    const {state: {user}, dispatch} = useContext(Context);


    return (
        <UserRoute>
            <div>
                <h1 className="jumbotron text-center square">User Dashboard</h1>
            </div>
        </UserRoute>
    );
};

export default Index;