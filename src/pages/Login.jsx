import React, { useState } from 'react'
import { client } from '../config/supabase'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            console.log(error, "login error");
        } else {
            console.log(data, 'login successfull');
            alert('login Successfull!!')
            navigate('/home')
        }
    }

    return (
        <>

            <input className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />

            <button onClick={handleLogin} className='border rounded-xl px-5 py-3 text-2xl font-serif font-bold'>login</button>
        </>
    )
}

export default Login