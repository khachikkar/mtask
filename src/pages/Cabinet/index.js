import React, {useState} from 'react'

import {Button} from 'antd'
import AddIssueModal from "../../components/shared/IssueModal/Add";

const Cabinet = () => {

  const [showModal, setShowModal] = useState(false)

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
