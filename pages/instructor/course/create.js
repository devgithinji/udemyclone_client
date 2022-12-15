import React, {useState} from 'react';
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import FileResizer from "react-image-file-resizer";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/router";

const CreateCourse = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '9.99',
        uploading: false,
        paid: true,
        category: '',
        loading: false,
        imagePreview: ''
    })

    const router = useRouter();

    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file))
        setUploadButtonText(file.name)
        setValues({...values, loading: true})

        FileResizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                const {data} = await axios.post('/api/course/upload-image', {
                    image: uri
                })
                //set image in the state and show toast
                toast.success("image uploaded successfully")
                setImage(data)
            } catch (e) {
                console.log(e)
                toast.warning('Image upload failed. try again later')
            }
            setValues({...values, loading: false})
        })
    }

    const handleImageRemove = async (e) => {
        e.preventDefault();
        try {
            setValues({...values, loading: true})
            const res = await axios.post('/api/course/remove-image', {image})
            setImage({})
            setPreview('')
            setUploadButtonText('Upload Image')
            toast.success('Image removed')
        } catch (e) {
            toast.error('Image delete failed')
        }
        setValues({...values, loading: false})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const {data} = axios.post('/api/course', {
                ...values,
                image
            })
            toast.success('Great now you can start adding lessons!')
            router.push('/instructor')

        } catch (e) {
            toast.error(e.response.data)
        }

    }


    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Create Course</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    handleImage={handleImage}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    handleImageRemove={handleImageRemove}
                    setValues={setValues}/>
            </div>
        </InstructorRoute>
    );
};

export default CreateCourse;