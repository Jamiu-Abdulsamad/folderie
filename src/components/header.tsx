import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || '';

    // Handle welcome page specially
    if (path === 'welcome' && user) {
      return 'Welcome, ' + user.name;
    }

    // Convert path to title case
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    navigate('/')
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          {/* Left side - Page Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side - User Info & Logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
                >
                  <LogOut size={16} />
                  <span className='text-md font-bold text-red-500'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
        <hr className="border-gray-500" />
      </div>
    </header>
  );
};

export default Header;