import React from 'react';
import {Button, Divider} from 'antd'

const AddLessonForm = ({values, setValues, addLesson, uploading}) => {
    return (
        <div className="container pt-3">
            <form action="" onSubmit={addLesson}>
                <input type="text" className="form-control square"
                       value={values.title}
                       onChange={e => setValues({...values, title: e.target.value})} placeholder="Title" autoFocus
                       required/>
                <textarea className="form-control mt-3" cols="7" rows="7"
                          value={values.content}
                          placeholder="lesson content"
                          onChange={e => setValues({...values, content: e.target.value})}></textarea>
                <Button onClick={addLesson} className="col mt-3" size="large" type="primary"
                        loading={uploading} shape="round">Save</Button>
            </form>
        </div>
    );
};

export default AddLessonForm;