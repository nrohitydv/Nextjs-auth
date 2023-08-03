'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('signup failed', error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Register'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 text-black "
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
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
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
}

export default SignupPage;
