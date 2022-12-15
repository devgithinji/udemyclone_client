import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import {toast} from "react-toastify";
import {Avatar} from "antd";
import Link from "next/link";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'

const InstructorIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, [])

    const loadCourses = async () => {
        try {
            const {data} = await axios.get('/api/instructor-courses')
            setCourses(data)
            toast.success('Courses fetched successfully')
        } catch (e) {
            toast.error('Could not fetch courses')
        }
    }

    const myStyle = {marginTop: '-15px', fontsize: '10px'}

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
            {courses && courses.map(course => (
                <div className="media pt-2">
                    <Avatar size={80} src={course.image ? course.image.Location : '/course.png'}/>
                    <div className="media-body pl-2">
                        <div className="row">
                            <div className="col">
                                <Link href={`/instructor/course/view/${course.slug}`} style={{cursor: 'pointer'}}
                                      className="mt-2 text-primary">
                                   <h5 className="pt-2"> {course.name}</h5>
                                </Link>
                                <p style={{marginTop: "-5px"}}>{course.lessons.length} Lessons</p>
                                {course.lessons.length < 5 ? (
                                    <p style={myStyle} className="text-warning">At least 5 lessons are required to publish a
                                        course</p>) : course.published ? (
                                        <p style={myStyle} className="text-success">Your course is Live</p>) :
                                    (<p style={myStyle} className="text-success">Your course is ready for publish</p>)}
                            </div>
                            <div className="col-md-3 mt-3 text-center">
                                {course.published ? (
                                    <div><CheckCircleOutlined className="h5 pointer text-success"/></div>) : (
                                    <div><CloseCircleOutlined className="h5 pointer text-warning"/></div>)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </InstructorRoute>
    );
};

export default InstructorIndex;