'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get('../api/users/me');
    setIsLoading(false);
    if (response.data.success) {
      setUser(response.data.data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get('../api/users/logout');
      if (response.data.success) {
        router.push('/login');
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <p>Profile page</p>
      <Toaster />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center"></div>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          {isLoading ? 'Loading...' : user?.username}
        </h2>
        <p className="mt-2 text-center text-gray-500">{user?.email}</p>
        <div className="mt-6">
          <button
            onClick={logout} // Log out the user
            className="mt-3 w-full text-center text-gray-500 font-semibold hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
