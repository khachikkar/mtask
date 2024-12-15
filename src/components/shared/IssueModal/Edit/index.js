import {Modal, Form , notification} from 'antd';
import {useEffect, useState} from "react";
import ModalForm from "../Form";

import {db} from "../../../../services/firbase";
import {doc, updateDoc} from "firebase/firestore";
import {FIRESTORE_PATH__NAMES} from "../../../../core/constants/constants";
import {fetchIssueData} from "../../../../state-management/slices/issues";
import {useDispatch} from "react-redux";



const EditIssueModal = ({isOpen, onClose, data}) => {





const dispatch = useDispatch();

const [buttonLoading, setButtonLoading] = useState(false);



const [form] = Form.useForm()

// implement a data fileds seted
    useEffect(() => {

        console.log(data, "data on useEffect")
       form.setFieldsValue(data)
        console.log("opened")
    }, [ data, form ])


const handleEditIssue = async (formData)=>{

try{
setButtonLoading(true)

// const {taskId, ...restData} = formData
 const {taskId} = data
    console.log(data, "ff")
const issueDocRef = doc(db, FIRESTORE_PATH__NAMES.ISSUES, taskId)
await updateDoc(issueDocRef, formData) // vory => vortex
notification.success({
    message: "Updated Successfully"
})

}catch(error){
    console.log(error)
}finally {
    setButtonLoading(false)
}


dispatch( fetchIssueData())
console.log(formData)

onClose()

}




return (
    <Modal
            title="Edit Issue"
            open={isOpen}
            width={600}
            okText="Edit Issue"
            centered
            onCancel={onClose}
            onOk={form.submit}
            loading={buttonLoading}

        >
<ModalForm form={form} onFinish={handleEditIssue} />
        </Modal>
    )
}

export default EditIssueModal