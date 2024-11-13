import React, {useState} from 'react';
import "./index.css"

import {Modal, Form} from 'antd';
import ModalForm from "../Form";

const AddIssueModal = ({isOpen, onClose, setShowModal}) => {

    const [buttonLoading, setButtonLoading] = useState(false);

const handleCreateIssue =  (values)=>{

    console.log("Handle Created Issue", values)
    setShowModal(false)
    setButtonLoading(false)
    form.resetFields()
}

const handleClose = ()=>{
    onClose()
    form.resetFields()
}


const [form] = Form.useForm() // pahuma formi sax fildery ira mej

    return (
        <Modal
        title="Add Issue"
        open={isOpen}
        width={600}
        onCancel={handleClose}
        onOk={form.submit}
        confirmLoading={buttonLoading}
        okText="Create Issue"
        centered
        >

    <ModalForm form={form} onFinish={handleCreateIssue} />

        </Modal>
    )
}



export default AddIssueModal