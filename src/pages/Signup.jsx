import React, { useState } from 'react'
import { client } from '../config/supabase'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            console.log(error, "signup error");
        } else {
            console.log(data, 'signup successfull');
            alert("successfully !!")
            navigate('/login')
        }
    }

    return (
        <>
            <input className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />

            <button onClick={handleSignup} className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold'>Signup</button>
        </>
    )
}

export default Signup