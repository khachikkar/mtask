import {taskStatus} from "../constants/issues";

// console.log(taskStatus);


export const transformIssueData = (data) => {
    const container = {}

    for(let i in taskStatus){
        container[taskStatus[i].key] = []
    }

    data.forEach((item)=>{
        if(container.hasOwnProperty(item.status)){
            container[item.status] = [...container[item.status], item]
        }
    })

    return container
}