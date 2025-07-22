"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Simple logout - in real app you'd clear tokens/sessions
    toast.success('Logged out successfully! Thank you for using MediCare Hospital Portal.', {
      duration: 3000
    });
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  // Don't show navbar on home, login, or signup pages
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MediCare Hospital
            </Link>
            <div className="flex space-x-4">
              {pathname === '/admin' && (
                <span className="text-gray-600">Admin Dashboard</span>
              )}
              {pathname === '/doctor' && (
                <span className="text-gray-600">Doctor Portal</span>
              )}
              {pathname === '/user' && (
                <span className="text-gray-600">User Portal</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/signup" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sign Up
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
