import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './context'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
function Protected({children,module}) {
 const {user}=useApp()
 if(!user)return <Navigate to="/login" replace/>
 if(user.role!=='owner' && module && !(user.permissions||[]).includes(module)) return <Navigate to="/" replace/>
 return children
}
const modules=['fleet','drivers','truckOwners','customers','bookings','trips','maintenance','fuel','expenses','invoices','payments','employees','tasks','attendance','salaries','documents','reports','notifications','calendar','activity','settings','backup']
export default function App(){
 return <Routes><Route path="/login" element={<Login/>}/><Route element={<Protected><Layout/></Protected>}><Route index element={<Dashboard/>}/>{modules.map(m=><Route key={m} path={m} element={<Protected module={m}><ModulePage module={m}/></Protected>}/>)}</Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
}
