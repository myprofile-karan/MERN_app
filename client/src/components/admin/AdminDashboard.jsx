import React from 'react'
import { useParams } from 'react-router-dom'

const AdminDashboard = () => {
    const {id} = useParams()
  return (
    <div>
      admin dashboard
    </div>
  )
}

export default AdminDashboard
