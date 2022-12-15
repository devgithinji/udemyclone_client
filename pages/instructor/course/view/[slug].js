import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import {toast} from "react-toastify";
import {Avatar, Button, Tooltip, Modal} from "antd";
import {EditOutlined, CheckOutlined, UploadOutlined} from "@ant-design/icons"
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";

const CourseView = () => {
    const [course, setCourse] = useState({})
    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: ''
    })
    const [uploading, setUploading] = useState(false)
    const router = useRouter();

    const {slug} = router.query;

    useEffect(() => {
        loadCourse()
    }, [slug])

    const addLesson = async (e) => {
        e.preventDefault();

    }

    const loadCourse = async () => {
        try {
            const {data} = await axios.get(`/api/course/${slug}`)
            setCourse(data)
            toast.success('Course fetched successfully')
        } catch (e) {
            toast.error(e.response.data)
        }

    }

    return (
        <InstructorRoute>
            <div className="container-fluid pt-3">
                {course && (
                    <div className="container-fluid pt-1">
                        <div className="media pt-2">
                            <Avatar size={80} src={course.image ? course.image.Location : '/course.png'}/>
                            <div className="media-body pl-2">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="mt-2 text-primary">{course.name}</h5>
                                        <p style={{marginTop: '-10px'}}>{course.lessons && course.lessons.length} Lessons</p>
                                        <p style={{marginTop: '-15px', fontSize: '10px'}}>
                                            {course.category}
                                        </p>
                                    </div>
                                    <div className="d-flex">
                                        <Tooltip title="Edit">
                                            <EditOutlined style={{cursor: 'pointer'}}
                                                          className="h5 pointer text-warning mr-4"/>
                                        </Tooltip>
                                        <Tooltip title="Publish">
                                            <CheckOutlined style={{cursor: 'pointer'}}
                                                           className="h5 pointer text-danger mr-4"/>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mt-2"><ReactMarkdown children={course.description}/></div>
                        </div>
                        <div className="row">
                            <Button onClick={() => setVisible(true)} className="col-md-6 offset-md-3 text-center"
                                    type="primary" shape="round" icon={<UploadOutlined/>} size="large">
                                Add Lesson
                            </Button>
                        </div>
                        <br/>
                        <Modal title="+ Add Lesson" centered visible={visible} onCancel={() => setVisible(false)}
                               footer={null}>
                            <AddLessonForm values={values} setValues={setValues} addLesson={addLesson}
                                           loading={uploading}/>
                        </Modal>
                    </div>
                )}
            </div>
        </InstructorRoute>
    );
};

export default CourseView;