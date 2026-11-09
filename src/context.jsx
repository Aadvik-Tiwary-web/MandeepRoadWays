import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultData, readData, writeData, readUsers, writeUsers, SESSION_KEY_NAME, makeId } from './lib/storage'

const Ctx = createContext(null)
export const MODULES = ['dashboard','fleet','drivers','truckOwners','customers','bookings','trips','maintenance','fuel','expenses','invoices','payments','employees','tasks','attendance','salaries','documents','reports','notifications','calendar','activity','settings','backup']
export const MODULE_LABELS = {
  dashboard:'Dashboard', fleet:'Fleet', drivers:'Drivers', truckOwners:'Truck Owners', customers:'Customers',
  bookings:'Bookings', trips:'Trips', maintenance:'Maintenance', fuel:'Fuel', expenses:'Expenses',
  invoices:'Invoices', payments:'Payments', employees:'Employees', tasks:'Tasks', attendance:'Attendance',
  salaries:'Salaries', documents:'Documents', reports:'Reports', notifications:'Notifications',
  calendar:'Calendar', activity:'Activity History', settings:'Settings', backup:'Backup & Restore'
}
export function AppProvider({ children }) {
  const [data, setData] = useState(readData)
  const [users, setUsers] = useState(readUsers)
  const [user, setUser] = useState(() => {
    try { const id = JSON.parse(localStorage.getItem(SESSION_KEY_NAME) || sessionStorage.getItem(SESSION_KEY_NAME) || 'null'); return readUsers().find(u => u.id === id) || null } catch { return null }
  })
  useEffect(() => writeData(data), [data])
  useEffect(() => writeUsers(users), [users])
  const log = (action) => setData(d => ({ ...d, activity: [{ id: makeId('ACT'), action, user: user?.email || 'System', date: new Date().toISOString() }, ...(d.activity || [])] }))
  const login = (email, password, remember) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.active)
    if (!found) return false
    setUser(found); if (remember) localStorage.setItem(SESSION_KEY_NAME, JSON.stringify(found.id)); else sessionStorage.setItem(SESSION_KEY_NAME, JSON.stringify(found.id))
    log('Signed in'); return true
  }
  const logout = () => { setUser(null); localStorage.removeItem(SESSION_KEY_NAME); sessionStorage.removeItem(SESSION_KEY_NAME) }
  const register = (form) => {
    if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) return false
    const next = { id: makeId('USR'), ...form, role: 'employee', active: true, permissions: ['dashboard'] }
    setUsers(u => [...u, next]); log(`Employee account created: ${form.email}`); return true
  }
  const updateData = (key, rows) => setData(d => ({ ...d, [key]: rows }))
  const value = useMemo(() => ({ data, setData, users, setUsers, user, login, logout, register, log, updateData }), [data, users, user])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useApp = () => useContext(Ctx)
