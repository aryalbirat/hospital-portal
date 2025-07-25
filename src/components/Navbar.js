"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { Heart, Home, UserPlus, LogOut, Shield, Stethoscope, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Simple logout
    toast.success('Logged out successfully! Thank you for using Carelink Hospital Portal.', {
      duration: 3000
    });
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  // Hide navbar on specific pages
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return null;
  }

 
  const getPageInfo = () => {
    switch (pathname) {
      case '/admin':
        return {
          title: 'Admin Dashboard',
          subtitle: 'System Management',
          icon: Shield,
          color: 'blue'
        };
      case '/doctor':
        return {
          title: 'Doctor Portal',
          subtitle: 'Patient Care',
          icon: Stethoscope,
          color: 'green'
        };
      case '/user':
        return {
          title: 'Patient Portal',
          subtitle: 'Health Management',
          icon: User,
          color: 'purple'
        };
      default:
        return {
          title: 'Carelink Portal',
          subtitle: 'Healthcare System',
          icon: Heart,
          color: 'blue'
        };
    }
  };

  const pageInfo = getPageInfo();
  const IconComponent = pageInfo.icon;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Logo and Page Info */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Carelink
                </h1>
                <p className="text-xs text-gray-500">Hospital Portal</p>
              </div>
            </Link>

            {/* Page Info */}
            <div className="hidden md:flex items-center space-x-3 pl-6 border-l border-gray-200">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                pageInfo.color === 'blue' ? 'bg-blue-100' :
                pageInfo.color === 'green' ? 'bg-green-100' :
                pageInfo.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <IconComponent className={`w-5 h-5 ${
                  pageInfo.color === 'blue' ? 'text-blue-600' :
                  pageInfo.color === 'green' ? 'text-green-600' :
                  pageInfo.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">{pageInfo.title}</h2>
                <p className="text-xs text-gray-500">{pageInfo.subtitle}</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-2">
            {/* Home Link */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>

            {/* Sign Up Link */}
            <Link 
              href="/signup" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
            >
              <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Sign Up</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}