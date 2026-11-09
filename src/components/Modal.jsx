import React from 'react'
import { X } from 'lucide-react'
export default function Modal({ title, children, onClose, wide=false }) {
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget && onClose()}><section className={`modal ${wide?'modal-wide':''}`}><header><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18}/></button></header>{children}</section></div>
}
