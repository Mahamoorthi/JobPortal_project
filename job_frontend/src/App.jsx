import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ApplyJob from './Template/ApplyJob'
import RegisterPage from './Template/RegisterPage'
import LoginPage from './Template/LoginPage'
import JobListPage from './Template/JobListPage'
import './App.css'
import Jobtitle_list from './Template/Jobtitle_list'
import Companieslist from './Template/Companieslist'
import Applicationslist from './Template/Applicationslist'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/jobs' element={<JobListPage/>} />
          <Route path='/apply/:jobId' element={<ApplyJob/>} />
          <Route path='/jobstitle' element={<Jobtitle_list/>}/>
          <Route path='/companies' element={<Companieslist/>}/>
          <Route path='/applications' element={<Applicationslist/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
