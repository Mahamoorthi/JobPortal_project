import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function CompaniesPage() {

  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const username = localStorage.getItem("username")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs")
      .then(res => res.json())
      .then(data => {
        const uniqueCompanies = [...new Set(data.map(j => j.company))]
        setCompanies(uniqueCompanies)
      })
  }, [])

  const loadJobs = (company) => {
    fetch(`http://127.0.0.1:8000/jobs/company/${company}/`)
      .then(res => res.json())
      .then(setJobs)
  }

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
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-bold mb-6">Companies</h2>

          {/* COMPANY LIST */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
            {companies.map((c, i) => (
              <div
                key={i}
                onClick={() => loadJobs(c)}
                className="cursor-pointer bg-white border rounded-lg p-4 text-center hover:shadow"
              >
                {c}
              </div>
            ))}
          </div>

          {/* JOB LIST */}
          {jobs.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Jobs</h3>

              <div className="grid gap-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white border rounded-lg p-4">
                    <h4 className="text-blue-700 font-semibold">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(job.posted_on).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  )
}

export default CompaniesPage