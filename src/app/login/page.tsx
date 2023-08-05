'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log('login success', res.data);
      toast.success('login success');

      router.push('/profile');
    } catch (error: any) {
      console.log('login failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Login'}</h1>
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
        {buttonDisabled ? 'No Login' : 'Login'}
      </button>
      <Link href="/signup">Want to Register</Link>
    </div>
  );
}

export default LoginPage;
