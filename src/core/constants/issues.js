import {BugOutlined, FlagOutlined, CheckSquareOutlined, ArrowUpOutlined, ArrowDownOutlined  } from "@ant-design/icons"



const ISSUE_TYPES = {
    BUG: "bug",
    TASK:"task",
    STORY:"story"
}


const ISSUE_PRIORITY = {
    HIGHEST: "highest",
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
    LOWEST: "lowest"
}






export const ISSUE_OPTIONS = {
    [ISSUE_TYPES.BUG]:{
        value: ISSUE_TYPES.BUG,
        icon : <BugOutlined style={{color: "crimson"}}/>,
        label: "Bug"
    },
    [ISSUE_TYPES.TASK]:{
        value: ISSUE_TYPES.TASK,
        icon: < CheckSquareOutlined style={{color: "blue"}}/>,
        label: "Task"
    },
    [ISSUE_TYPES.STORY]:{
        value: ISSUE_TYPES.STORY,
        icon: < FlagOutlined style={{color: "green"}}/>,
        label: "Story"
    }
}

export const ISSUE_PRIORITY_OPTIONS = {
    [ISSUE_PRIORITY.HIGHEST]: {
        value: ISSUE_PRIORITY.HIGHEST,
        icon : <ArrowUpOutlined style={{color: "#096a0a"}} />,
        label: "Highest"
    },
    [ISSUE_PRIORITY.HIGH]: {
        value: ISSUE_PRIORITY.HIGH,
        icon : <ArrowUpOutlined style={{color: "#13bf14"}}/>,
        label: "High"
    },
    [ISSUE_PRIORITY.MEDIUM]: {
        value: ISSUE_PRIORITY.MEDIUM,
        icon : <ArrowUpOutlined style={{color: "#c1690e"}} />,
        label: "Medium"
    },
    [ISSUE_PRIORITY.LOW]: {
        value: ISSUE_PRIORITY.LOW,
        icon : <ArrowDownOutlined style={{color: "#c31414"}}/>,
        label: "Low"
    },
    [ISSUE_PRIORITY.LOWEST]: {
        value: ISSUE_PRIORITY.LOWEST,
        icon : <ArrowDownOutlined style={{color: "#ef4747"}}/>,
        label: "Lowest"
    },
}


