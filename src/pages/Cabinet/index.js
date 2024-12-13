import React, {useState, useEffect} from 'react'
import {Button, Typography, Flex} from 'antd'
import AddIssueModal from "../../components/shared/IssueModal/Add";
import EditIssueModal from "../../components/shared/IssueModal/Edit";
import {useSelector, useDispatch} from "react-redux";
import {fetchIssueData} from "../../state-management/slices/issues";
import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {ISSUE_OPTIONS} from "../../core/constants/issues";
import {changeIssueColumns} from "../../state-management/slices/issues";

import {db} from "../../services/firbase";
import {doc, updateDoc} from "firebase/firestore";


import LoadingWraper from "../../components/shared/LoadingWraper";
import "./index.css"







const Cabinet = () => {

const {Title, Text} = Typography
const [showModal, setShowModal] = useState(false)
const [editModalData, setEditModalData] = useState(null)

 console.log(editModalData, "LLLL")




const {data, isLoading} = useSelector(store=>store.issues)
const dispatch = useDispatch()
  console.log(data, "dddata")

  useEffect(() => {
   dispatch( fetchIssueData())
  }, [dispatch]);


const handleOpenModal = ()=>{
    setShowModal(true)
  }
const handleClose = ()=>{
  setShowModal(false)
}





const handleChangeTaskStatus = async( result ) =>{
  console.log(result, "result")
  if(result.destination){
    try{
      const {source, destination} = result
      dispatch(changeIssueColumns({source, destination}))
    }catch(e){
      console.log("Error Drag")
    }
  }
}




  return (
    <div>
    <h2>Cabinet</h2>
      <Button onClick={handleOpenModal} type="primary">Create a Issue</Button>
      <AddIssueModal onClose={handleClose} isOpen={showModal} setShowModal={setShowModal} />
      {/* Booleanov asenq ete datan kaa true e nor mount ara editmodal y*/}
      {
        Boolean(editModalData) &&   <EditIssueModal data={editModalData} onClose={()=>setEditModalData(null)} isOpen={Boolean(editModalData)}  />
      }

      {/*to do border*/}
      <div className="drag_context_container">
        <LoadingWraper loading={isLoading}>
          <DragDropContext onDragEnd={handleChangeTaskStatus}>
            {
              Object.entries(data).map(([columnId, column]) => {
                return (
                    <div className="column_container" key={columnId}>
                      <div className="column_header">
                        <Title level={5} type="secondary">
                          {columnId}
                          {' '}
                          ({column.length})
                        </Title>
                      </div>

                      <div>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="droppable_container"
                                >
                                  {
                                    column.map((item, index) => {
                                      return (
                                          <Draggable
                                              key={item.taskId}
                                              draggableId={item.taskId}
                                              index={index}
                                          >
                                            {
                                              (provided, snapshot) => {
                                                return (
                                                    <div
                                                        className="issue_card_container"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >

                                                    {/*  to change */}
                                                    <Flex justify="space-between">
                                                     <Text> {item.issueName} </Text>
                                                      <div>
                                                        {ISSUE_OPTIONS[item.type]?.icon}
                                                      </div>
                                                    </Flex>

                                                    </div>
                                                )
                                              }
                                            }
                                          </Draggable>
                                      )
                                    })
                                  }
                                </div>
                            )
                          }}
                        </Droppable>
                      </div>
                    </div>
                )
              })
            }
          </DragDropContext>
        </LoadingWraper>
      </div>
    </div>
  )
}

export default Cabinet
