import React from 'react'
export default function StatCard({ label, value, change, icon:Icon, tone='gold' }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={20}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-foot">{change}</div></div>
}
