import { authClient } from "lib/auth-client";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Header() {

  const {data: session} = authClient.useSession();
  const navigate = useNavigate();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Redirect to home page after successful logout
          navigate({ to: '/login' });
        }
      }
    });
  };

  console.log(session);

  return (
    <header className="p-4 px-20 bg-gray-800 text-white shadow-lg">
      <nav className="flex items-center justify-between">
        <span>Logo</span>
          {
            session 
            ? (
            <div className="flex items-center gap-4">
              <span>Bienvenido {session.user.name}</span> 
              <Button onClick={logout}>Log Out</Button>
            </div>
            )
            : <span>Not logged in</span>
          }
      </nav>
    </header>
  )
}
