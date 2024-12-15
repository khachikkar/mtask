import React, {useEffect} from 'react';
import {Avatar,  Form, Input, Select, Space} from "antd"
import {ISSUE_OPTIONS} from "../../../../core/constants/issues";
import {ISSUE_PRIORITY_OPTIONS} from "../../../../core/constants/issues";
import Editor from "../../../Editor";
import {useDispatch, useSelector} from "react-redux";
import {fetchallUsers} from "../../../../state-management/slices/allUsers";


const ModalForm = ({form, onFinish})=>{


const {users} = useSelector(store=>store.users);

const {authUserInfo: { userData}}= useSelector((store)=>store.userProfile)
const dispatch = useDispatch();

const musers = users.filter(user => user.companyName === userData.companyName);

    useEffect(() => {

        dispatch(fetchallUsers())
    }, [dispatch]);

    console.log(userData, "u")

return(
<Form layout="vertical" form={form} onFinish={onFinish}>


<Form.Item
label="Issue Name"
name="issueName"
rules={[
    {
        required: true,
        message: "Please enter an Issue Name",
    }
]}
>
<Input type="text" placeholder="Enter Issue Name" />
</Form.Item>

<Form.Item
        label="Issue Type"
        name="type"
        rules={[
            {
                required: true,
                message: "Please enter an Issue Type",
            }
        ]}
>
<Select placeholder="Issue Type">
            {
                Object.values(ISSUE_OPTIONS).map(({value, icon , label})=>{
                    return(
                        <Select.Option
                            key={value}
                            value={value}>
                           <Space>
                               {icon}{label}
                           </Space>
                        </Select.Option>
                    )
                })
            }
        </Select>
</Form.Item>


    <Form.Item
        label="Issue Priority"
        name="priority"
        rules={[
            {
                required: true,
                message: "Please enter an Issue Type",
            }
        ]}
    >
        <Select placeholder="Issue Priority">
            {
                Object.values(ISSUE_PRIORITY_OPTIONS).map(({value, icon , label})=>{
                    return(
                        <Select.Option
                            key={value}
                            value={value}>
                            <Space>
                                {icon}{label}
                            </Space>
                        </Select.Option>
                    )
                })
            }
        </Select>
    </Form.Item>


    {/*add a assigner*/}


    <Form.Item
        label="Assign To"
        name="assignTo"
        rules={[
            {
                required: true,
                message: "Please chosse a Assigner",
            }
        ]}
    >
        <Select placeholder="Assign to">
            {
                musers.map(({name, lastname, uid, imgUrl, position})=>{
                    return(
                        <Select.Option
                            key={uid}
                            value={uid}>
                            <Space>
                               <Avatar src={imgUrl}></Avatar>{name}{lastname} <h5>{position}</h5>
                            </Space>
                        </Select.Option>
                    )
                })
            }
        </Select>
    </Form.Item>



    <Form.Item
        label="Issue Owner"
        name="owner"
        rules={[
            {
                required: true,
                message: "Please fill the owner filed",
            }
        ]}
    >
      {/*<Flex><Avatar src={userData.imgUrl} />{userData.name} {userData.lastname}</Flex>*/}
        <Select>
        <Select.Option
            key={userData.uid}
            value={userData.uid}>
            <Space>
                <Avatar src={userData.imgUrl}></Avatar>{userData.name}{userData.lastname} <h5>{userData.position}</h5>
            </Space>
        </Select.Option>
        </Select>

    </Form.Item>






    <Form.Item
        name="description"
        label="Description"
        rules={[
            {
                required: true,
                message: "Please enter an Issue Description",
            }
        ]}>
{/*<Input.TextArea showCount />*/}
<Editor />
    </Form.Item>

</Form>

)
}


//todo




export default  ModalForm