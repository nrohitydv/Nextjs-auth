'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function LoginPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const onLogin = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="password">email</label>

      <input
        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        Signup
      </button>
      <Link href="/signup">Want to Register</Link>
    </div>
  );
}

export default LoginPage;
