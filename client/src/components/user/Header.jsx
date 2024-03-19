import React from 'react'
import Logout from '../Logout'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/user/dashboard/"><span className="text-white text-lg font-semibold">User Dashboard</span></Link>
      </div>
      <div className="flex items-center space-x-4">
        <Logout />
      </div>
    </div>
  </header>
  )
}

export default Header
