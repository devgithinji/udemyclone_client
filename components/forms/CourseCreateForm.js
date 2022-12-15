import {Button, Select, Avatar, Badge} from "antd";

const {Option} = Select;

const CourseCreateForm = ({
                              handleSubmit,
                              handleChange,
                              values,
                              setValues,
                              handleImage,
                              preview,
                              uploadButtonText,
                              handleImageRemove
                          }) => {

    const children = () => {
        let options = [];
        for (let i = 9.99; i < 99.99; i++) {
            options.push(
                <Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>
            )
        }
        return options;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type="text" name="name" className="form-control" placeholder="Name" value={values.name}
                       onChange={handleChange}/>
            </div>
            <div className="form-group">
                    <textarea name="description" cols="7" rows="7" value={values.description} className="form-control"
                              onChange={handleChange} placeholder="description"></textarea>
            </div>
            <div className="form-row">
                <div className="col">
                    <div>
                        <Select value={values.paid} style={{width: '100%'}} size="large"
                                onChange={v => setValues({...values, paid: !values.paid})}>
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>
                {values.paid && (
                    <div className="form-group">
                        <Select defaultValue="$9.99" style={{width: '100%'}}
                                onChange={v => setValues({...values, price: v})} tokenSeparators={[,]} size="large">
                            {children()}
                        </Select>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <input type="text" name="category" className="form-control" placeholder="Category"
                       value={values.category}
                       onChange={handleChange}/>
            </div>
            <div className="form-row pt-3">
                <div className="col">
                    <div className="form-group">
                        <label className="btn btn-outline-secondary btn-block text-left">
                            {uploadButtonText}
                            <input type="file" name="image" onChange={handleImage} accept="image/*" hidden/>
                        </label>
                    </div>
                </div>
                {preview && (
                    <Badge count="X" onClick={handleImageRemove} style={{cursor: 'pointer'}}>
                        <Avatar width={200} src={preview}/>
                    </Badge>
                )}
            </div>
            <div className="row">
                <div className="col">
                    <Button onClick={handleSubmit} disabled={values.loading || values.uploading}
                            className="btn btn-primary" type="primary" size="large" shape="round"
                            loading={values.loading}>
                        {values.loading ? 'Saving...' : 'Save & Continue'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default CourseCreateForm;