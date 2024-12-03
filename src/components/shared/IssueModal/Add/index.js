import React, {useState} from 'react';
import "./index.css"

import {Modal, Form, notification} from 'antd';
import ModalForm from "../Form";
import generateUid from "../../../../core/helpers/generateUid";



import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../../services/firbase";
import {FIRESTORE_PATH__NAMES} from "../../../../core/constants/constants";

import {useDispatch} from "react-redux";
import {fetchIssueData} from "../../../../state-management/slices/issues";



const AddIssueModal = ({isOpen, onClose, setShowModal}) => {

const dispatch = useDispatch();




const [buttonLoading, setButtonLoading] = useState(false);

const handleCreateIssue =  async(values)=>{

    //sending backend
    const taskId = generateUid()

    console.log("Handle Created Issue", values)
    setButtonLoading(true)

    const TaskModel = {
        taskId,
        ...values,
        date: new Date().toLocaleDateString()
    }

    try{
const docRef = doc(db, FIRESTORE_PATH__NAMES.ISSUES, taskId)
        await setDoc(docRef, TaskModel)
        onClose()
        form.resetFields()
        notification.success({
            message:"Action Created"
        })
        dispatch(fetchIssueData())
    }catch(e){
        notification.error({
            message:"Action not created"
        })
    }finally {
        setButtonLoading(false)
        setShowModal(false)
    }


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