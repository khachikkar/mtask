import React from 'react';
import "./index.css"
import {Upload, Progress} from "antd"
import { PlusOutlined} from "@ant-design/icons"
import PropTypes from "prop-types" // define property types for dont do typeErrors

import {useSelector} from "react-redux";


const ImageUpload = ({progress, uploading, handleUpload}) => {

const {userData:{imgUrl, uid, firstname}} = useSelector(store=> store.userProfile.authUserInfo);


const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {uploading ? <Progress type="circle" size={80} percent={progress}/> : <PlusOutlined />}
        </button>
);


return (
        <div style={{display:"flex"}}>


                    <Upload
                        fileList={
                        [
                            {
                                uid: uid,
                                name: `${firstname}`,
                                status: "done",
                                url: imgUrl,

                            }
                        ]
                        }
                        customRequest={handleUpload}
                        // showUploadList={false}
                        listType="picture-card"
                    >
                        {uploadButton}
                    </Upload>



        </div>
    )
}

ImageUpload.propTypes = {
handleUpload: PropTypes.func.isRequired,
progress: PropTypes.number.isRequired,
uploading: PropTypes.bool.isRequired,
size: PropTypes.oneOf(["small", "medium", "large"])
}


export default ImageUpload