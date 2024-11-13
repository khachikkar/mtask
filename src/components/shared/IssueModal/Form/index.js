import React from 'react';
import {Form, Input, Select, Space} from "antd"

import {ISSUE_OPTIONS} from "../../../../core/constants/issues";
import {ISSUE_PRIORITY_OPTIONS} from "../../../../core/constants/issues";

const ModalForm = ({form, onFinish})=>{

    console.log(Object.values(ISSUE_OPTIONS));





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



</Form>

)
}


//todo




export default  ModalForm