import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Truck, Users, UserRound, Building2, Contact, CalendarDays, Route, Wrench, Fuel, Receipt, FileText, CreditCard, ClipboardList, CalendarCheck, Wallet, FolderOpen, BarChart3, Bell, Calendar, History, Settings, Database, LogOut, X } from 'lucide-react'
import { MODULE_LABELS, MODULES, useApp } from '../context'
const icons = { dashboard:LayoutDashboard, fleet:Truck, drivers:Users, truckOwners:Building2, customers:Contact, bookings:CalendarDays, trips:Route, maintenance:Wrench, fuel:Fuel, expenses:Receipt, invoices:FileText, payments:CreditCard, employees:UserRound, tasks:ClipboardList, attendance:CalendarCheck, salaries:Wallet, documents:FolderOpen, reports:BarChart3, notifications:Bell, calendar:Calendar, activity:History, settings:Settings, backup:Database }
export default function Sidebar({ open, onClose }) {
  const { user, logout } = useApp()
  const allowed = user?.role === 'owner' ? MODULES : ['dashboard', ...(user?.permissions || [])]
  return <><div className={`mobile-shade ${open ? 'show' : ''}`} onClick={onClose}/><aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
    <div className="brand"><div className="brand-mark">MR</div><div><b>MANDEEP</b><span>ROADWAYS</span></div><button className="mobile-close" onClick={onClose}><X size={18}/></button></div>
    <div className="side-caption">WORKSPACE</div>
    <nav>{MODULES.filter(k => allowed.includes(k)).map(k => { const Icon = icons[k]; return <NavLink key={k} to={k === 'dashboard' ? '/' : `/${k}`} onClick={onClose} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{MODULE_LABELS[k]}</span></NavLink> })}</nav>
    <div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">{user?.firstName?.[0] || 'M'}</div><div className="profile-text"><b>{user?.firstName} {user?.lastName}</b><span>{user?.role}</span></div></div><button className="logout-btn" onClick={logout}><LogOut size={17}/> Sign out</button></div>
  </aside></>
}
