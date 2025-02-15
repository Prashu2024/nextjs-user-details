"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import {useRouter, useSearchParams } from "next/navigation";


export default function Users() {
  const router = useRouter();
  // const { page = 1 } = router.query;
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;



  useEffect(() => {
    async function fetchUsers() {
      // const res = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
      const res = await fetch(`https://reqres.in/api/users?page=${page}`);

      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    }
    fetchUsers();
  }, [page]);

  // const handlePageChange = (newPage) => {
  //   router.push(`?page=${newPage}`, undefined, { shallow: true });
  // };
  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  justify-items-end font-bold mb-4">User List</h1>

      {/* Desktop Table View */}
      <div className="hidden md:block">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">
                <img src={user.avatar} alt={user.first_name} className="h-10 w-10 rounded-full mx-auto" />
              </td>
              <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <p className="font-semibold text-lg">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      
      <div className="flex justify-center mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:opacity-50" 
          onClick={() => handlePageChange(Number(page) - 1)}
          disabled={Number(page) === 1}
        >
          Previous
        </button>
        <div className="mt-2">{page} of {totalPages}</div>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2 disabled:opacity-50" 
          onClick={() => handlePageChange(Number(page) + 1)}
          disabled={Number(page) >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}