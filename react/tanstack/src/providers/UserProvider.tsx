import { useState } from "react";
import { UserContext } from "../context/UserContext";



export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState({
    name: "Devansh" ,
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}