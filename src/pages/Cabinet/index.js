import React, {useState, useEffect} from 'react'
import {Button} from 'antd'
import AddIssueModal from "../../components/shared/IssueModal/Add";
import EditIssueModal from "../../components/shared/IssueModal/Edit";
import {useSelector, useDispatch} from "react-redux";
import {fetchIssueData} from "../../state-management/slices/issues";
import "./index.css"


const Cabinet = () => {

const [showModal, setShowModal] = useState(false)
const [editModalData, setEditModalData] = useState(null)

 console.log(editModalData, "LLLL")




const {data} = useSelector(store=>store.issues)
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
      <div className="board_container">
        <h2>TO DO</h2>
        {
          data.map((item)=>{
            return (
                  <div key={item.taskId} onClick={()=> setEditModalData(item)}>
                    {item.issueName}
                  </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cabinet
