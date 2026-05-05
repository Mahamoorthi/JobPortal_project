import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function JobListPage() {

  const [jobs, setJobs] = useState([])
  const username = localStorage.getItem("username")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/job-titles/")
      .then(res => res.json())
      .then(setJobs)
      .catch(err => console.error("Failed to fetch jobs:", err))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR (same) */}
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

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, {username}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              {username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-bold mb-6">Available Job Titles</h2>

          {/* JOB TITLE BOX */}
          <div className="bg-white rounded-xl shadow-sm border p-4">

            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center">No Jobs Found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                {jobs.map(job => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="text-blue-700 font-semibold text-sm">
                      {job.title}
                    </h3>
                  </div>
                ))}

              </div>
            )}

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>

    </div>
  )
}

export default JobListPage