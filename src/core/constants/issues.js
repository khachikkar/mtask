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

export const COLOR_TYPES = {
    RED: "#ef6f6c",
    HIGHRED: "#da2c38",
    ORANGE: "#fbb02d",
    GREEN: "#9ef01a",
    HIGHGREEN:"#70e000",
    BLUE: "#348aa7",
    PURPLE: "#5603ad"
}




export const ISSUE_OPTIONS = {
    [ISSUE_TYPES.BUG]:{
        value: ISSUE_TYPES.BUG,
        icon : <BugOutlined style={{color: COLOR_TYPES.RED}}/>,
        label: "Bug"
    },
    [ISSUE_TYPES.TASK]:{
        value: ISSUE_TYPES.TASK,
        icon: < CheckSquareOutlined style={{color: COLOR_TYPES.BLUE}}/>,
        label: "Task"
    },
    [ISSUE_TYPES.STORY]:{
        value: ISSUE_TYPES.STORY,
        icon: < FlagOutlined style={{color: COLOR_TYPES.PURPLE}}/>,
        label: "Story"
    }
}

export const ISSUE_PRIORITY_OPTIONS = {
    [ISSUE_PRIORITY.HIGHEST]: {
        value: ISSUE_PRIORITY.HIGHEST,
        icon : <ArrowUpOutlined style={{color: COLOR_TYPES.HIGHGREEN}} />,
        label: "Highest"
    },
    [ISSUE_PRIORITY.HIGH]: {
        value: ISSUE_PRIORITY.HIGH,
        icon : <ArrowUpOutlined style={{color: COLOR_TYPES.GREEN}}/>,
        label: "High"
    },
    [ISSUE_PRIORITY.MEDIUM]: {
        value: ISSUE_PRIORITY.MEDIUM,
        icon : <ArrowUpOutlined style={{color: COLOR_TYPES.ORANGE}} />,
        label: "Medium"
    },
    [ISSUE_PRIORITY.LOW]: {
        value: ISSUE_PRIORITY.LOW,
        icon : <ArrowDownOutlined style={{color: COLOR_TYPES.RED}}/>,
        label: "Low"
    },
    [ISSUE_PRIORITY.LOWEST]: {
        value: ISSUE_PRIORITY.LOWEST,
        icon : <ArrowDownOutlined style={{color: COLOR_TYPES.HIGHRED}}/>,
        label: "Lowest"
    },
}


