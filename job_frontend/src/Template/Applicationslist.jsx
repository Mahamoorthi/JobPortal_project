import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function ApplicationsPage() {

  const [applications, setApplications] = useState([])
  const userId = localStorage.getItem("userId")
  const username = localStorage.getItem("username")

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user-applied-jobs/${userId}/`)
      .then(res => res.json())
      .then(setApplications)
  }, [userId])

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            
            <NavLink 
              to="/jobstitle" 
              className="hover:text-blue-700"
            >
              Jobs
            </NavLink>
          
            <NavLink 
              to="/companies" 
              className="hover:text-blue-700"
            >
              Companies
            </NavLink>
          
            <NavLink 
              to="/applications" 
              className="hover:text-blue-700"
            >
              My Applications
            </NavLink>
          
          </nav>

          <span className="text-sm text-gray-600">Hello, {username}</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-bold mb-6">My Applications</h2>

          {applications.length === 0 ? (
            <p className="text-gray-500">No applications found</p>
          ) : (
            <div className="space-y-4">

              {applications.map(app => (
                <div key={app.id} className="bg-white border rounded-lg p-4">

                  <p className="text-sm text-gray-600">
                    Job ID: {app.job_title}
                  </p>

                  <p className="text-sm">
                    Status:
                    <span className="ml-2 font-semibold text-blue-700">
                      {app.status}
                    </span>
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Applied on: {new Date(app.applied_on).toLocaleDateString()}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default ApplicationsPage