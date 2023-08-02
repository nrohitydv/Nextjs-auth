"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from 'axios'


function page() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    })
    const onSignup = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Register</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300" id="username" type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="username" />
            <label htmlFor="email">email</label>
            <input className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300" id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
            <label htmlFor="password">password</label>
            <input className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300" id="password" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
            <button onClick={onSignup} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Signup</button>
            <Link href='/login'>Visit Login</Link>
        </div>
    )
}

export default page
