import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../passwordGenerate/PasswordGenerate.css"
const PasswordGenerate = () => {
    const[length,setLength]=useState(8)
    const[numberAllowed,setnumberAllowed]=useState(false)
    const[characterAllowed,setcharacterAllowed]=useState(false)
    const[password,setPassword]=useState()
    const passwordRef=useRef()
    
     let pass=""
    const passwordGenerator=useCallback(()=>{
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed)
            str +="0123456789"
        
        if(characterAllowed)
            str +="!@#$%^&*()~}"
        
        
        for(let i=1;i<=length;i++){
            let char=Math.floor(Math.random()*str.length+1)
            pass+=str.charAt(char)
            
        }
        setPassword(pass)
        
    },[length,numberAllowed,characterAllowed,setPassword])
      useEffect(()=>{
        passwordGenerator()
      },[length,numberAllowed,characterAllowed,setPassword]) 
       const copyPassword=useCallback(()=>{
        passwordRef.current?.select(password)
       window.navigator.clipboard.writeText(password)

       },[password])
  return (
    <>
<div className='mainDiv'>
    <h1>Password Generator</h1>
    <div className='inputDiv'>
        <input type='text' placeholder='password' ref={passwordRef} readOnly value={password}/>
        <button onClick={copyPassword}>copy</button>
    </div>
    <div className='checkboxDiv'>
        <input type='range' min={4} max={12} onChange={(e)=>setLength(e.target.value)}/>
        <label>length:{length}</label>
        <input type='checkbox' defaultChecked={numberAllowed} onChange={()=>{setnumberAllowed((prev)=>!prev)}}/>
        <label>Number</label>
        <input type='checkbox' defaultChecked={characterAllowed}  onChange={()=>{setcharacterAllowed((prev)=>!prev)}}/>
        <label>character</label>
    </div>
</div>
    </>
  )
}

export default PasswordGenerate
