import { authClient } from "lib/auth-client";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Header() {

  const {data: session} = authClient.useSession();
  const navigate = useNavigate();

const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        if(typeof window !== 'undefined') {
            const html = document.documentElement;
            if(html.classList.contains('dark')) {
                html.classList.remove('dark');
                setTheme('light');
            } else {
                html.classList.add('dark');
                setTheme('dark');
            }
        }
    };

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
    <header className="p-4 px-20">
      <nav className="flex items-center justify-between">
        <span className="text-xl font-semibold">Logo</span>
        <div className="flex items-center gap-4">
        <button className="" onClick={toggleTheme}>
            {
                theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
            }
        </button>

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
        </div>
      </nav>
    </header>
  )
}
