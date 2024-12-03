import React, {useState, useEffect} from 'react'
import {Button} from 'antd'
import AddIssueModal from "../../components/shared/IssueModal/Add";

import {useSelector, useDispatch} from "react-redux";
import {fetchIssueData} from "../../state-management/slices/issues";


const Cabinet = () => {

const [showModal, setShowModal] = useState(false)
const {data} = useSelector(store=>store.issues)
const dispatch = useDispatch()
  console.log(data, "dddata")

  useEffect(() => {
   dispatch( fetchIssueData())
  }, []);


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
    </div>
  )
}

export default Cabinet
