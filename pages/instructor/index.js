import React, {useContext} from 'react';
import {Context} from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
        </InstructorRoute>
    );
};

export default InstructorIndex;