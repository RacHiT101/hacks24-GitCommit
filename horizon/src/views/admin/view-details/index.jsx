import React from 'react'
import { useParams } from 'react-router-dom'

function View() {
  const { id } = useParams();
  console.log(id)
  return (
    <div>View</div>
  )
}

export default View