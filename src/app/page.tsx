import Link from 'next/link';

function page() {
  return (
    <div className="text-center">
      Home
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Link
          href="/login"
          className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          login
        </Link>
      </div>
    </div>
  );
}

export default page;
