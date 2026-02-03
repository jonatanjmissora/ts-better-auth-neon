import { authClient } from "lib/auth-client";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@tanstack/react-router";

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
            : (
            <div className="flex items-center gap-4">
              <Link to="/login"><Button>Log In</Button></Link>
              <Link to="/register"><Button>Register</Button></Link>
            </div>
            )
          }
      </nav>
    </header>
  )
}
