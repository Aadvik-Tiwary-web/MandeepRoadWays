import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Truck, ShieldCheck } from 'lucide-react'
import { useApp } from '../context'
export default function Login() {
  const { user, login, register } = useApp(), nav = useNavigate()
  const [mode,setMode] = useState('login'), [show,setShow] = useState(false), [remember,setRemember] = useState(true), [error,setError] = useState('')
  const [form,setForm] = useState({email:'owner@mandeep.com',password:'Mandeep@123',firstName:'',lastName:''})
  if (user) return <Navigate to="/" replace/>
  const change = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = e => { e.preventDefault(); setError(''); if(mode==='login'){ if(login(form.email,form.password,remember)) nav('/'); else setError('Invalid credentials or inactive account.') } else { if(form.password.length<8) return setError('Password must contain at least 8 characters.'); if(register(form)) { setMode('login'); setError('Account created. Sign in to continue.'); } else setError('An account with this email already exists.') } }
  return <div className="auth-screen"><div className="auth-decoration"><div className="auth-orbit orbit-one"/><div className="auth-orbit orbit-two"/><div className="auth-brand"><div className="brand-mark large"><Truck size={30}/></div><h1>MANDEEP<br/><em>ROADWAYS</em></h1><p>Moving business forward.</p></div><div className="auth-bottom">TRANSPORT MANAGEMENT SYSTEM <span>•</span> BUILT FOR OPERATIONS</div></div>
    <div className="auth-panel"><div className="auth-card"><div className="eyebrow">SECURE WORKSPACE ACCESS</div><h2>{mode==='login'?'Welcome back':'Create employee account'}</h2><p className="muted">{mode==='login'?'Sign in to manage your transport operations.':'Your account will be registered with employee access.'}</p>
      <form onSubmit={submit}>{mode==='signup' && <div className="form-grid"><label>First name<input name="firstName" value={form.firstName} onChange={change} required/></label><label>Last name<input name="lastName" value={form.lastName} onChange={change} required/></label></div>}
        <label>Email address<input name="email" type="email" value={form.email} onChange={change} placeholder="name@company.com" required/></label>
        <label>Password<div className="password-wrap"><input name="password" type={show?'text':'password'} value={form.password} onChange={change} required/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
        {mode==='login' && <div className="auth-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember me</label><button type="button" className="text-btn" onClick={()=>setMode('forgot')}>Forgot password?</button></div>}
        {mode==='forgot' && <div className="notice">Password recovery is managed by your workspace owner. Contact your administrator to reset access.</div>}
        {error && <div className="form-message">{error}</div>}
        {mode!=='forgot' && <button className="primary-btn full-btn" type="submit">{mode==='login'?'Sign in to workspace':'Create employee account'}</button>}
        {mode==='forgot' && <button className="primary-btn full-btn" type="button" onClick={()=>setMode('login')}>Back to sign in</button>}
      </form><div className="auth-switch">{mode==='signup'?'Already have access?':'New employee?'} <button className="text-btn" onClick={()=>{setMode(mode==='signup'?'login':'signup');setError('')}}>{mode==='signup'?'Sign in':'Create account'}</button></div>
      <div className="secure-note"><ShieldCheck size={15}/> Access is controlled by your workspace role</div>
    </div></div></div>
}
