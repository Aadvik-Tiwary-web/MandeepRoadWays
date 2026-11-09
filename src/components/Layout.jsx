import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, Bell, Plus, ChevronDown } from 'lucide-react'
import Sidebar from './Sidebar'
import { useApp, MODULE_LABELS } from '../context'
export default function Layout() {
  const [open,setOpen] = useState(false), [search,setSearch] = useState('')
  const { data } = useApp(), location = useLocation(), navigate = useNavigate()
  const key = location.pathname.split('/')[1] || 'dashboard'
  const title = MODULE_LABELS[key] || 'Dashboard'
  const results = Object.entries(data).flatMap(([k,rows]) => Array.isArray(rows) ? rows.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase())).slice(0,3).map(r => ({k,r})) : []).slice(0,7)
  return <div className="app-shell"><Sidebar open={open} onClose={()=>setOpen(false)}/><main className="main-area">
    <header className="topbar"><button className="icon-btn menu-btn" onClick={()=>setOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div>
      <div className="top-actions"><div className="global-search"><Search size={17}/><input placeholder="Search anything..." value={search} onChange={e=>setSearch(e.target.value)}/>{search && <button onClick={()=>setSearch('')}>×</button>}
        {search && <div className="search-results">{results.map(({k,r})=><button key={r.id} onClick={()=>{navigate(`/${k}`);setSearch('')}}><b>{r.name || r.title || r.id}</b><span>{MODULE_LABELS[k] || k}</span></button>)}{!results.length && <p>No matching records</p>}</div>}</div>
        <button className="icon-btn notification-btn" onClick={()=>navigate('/notifications')}><Bell size={18}/>{data.notifications?.some(n=>!n.read) && <i/>}</button><div className="top-date">{new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</div>
      </div>
    </header><div className="page-content"><Outlet/></div>
  </main></div>
}
