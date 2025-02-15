import { Suspense } from "react";
import Users from "./Userpage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Users />
    </Suspense>
  );
}
