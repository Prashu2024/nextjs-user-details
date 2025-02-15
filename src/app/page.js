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


// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main> */}
//       {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer> */}
//     </div>
//   );
// }
