import { Link, useNavigate } from 'react-router';
import validator from 'validator';
import { Eye, EyeClosed } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (!validator.isEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }

    const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];

    // Extract the domain part of the email (after '@')
    const emailDomain = formData.email.split('@')[1];

    // Check if the email domain is in the allowed domains list
    if (!allowedDomains.includes(emailDomain)) {
      setError('Please use a valid email address (e.g., Gmail, Yahoo, Hotmail)');

      setTimeout(() => {
        setError(null);
      }, 5000)
      return;
    }


    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as Array<{ email: string; password: string, id: string, name: string }>;

    // Validate user credentials
    const user = existingUsers.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }


    localStorage.setItem('authenticatedUser', JSON.stringify({ id: user.id, name: user.name }));


    navigate('/app/welcome');
  };

  // Auto-logout functionality after 20 minutes of inactivity
  useEffect(() => {
    const handleInactivity = () => {
      const timeout = setTimeout(() => {
        localStorage.removeItem('authenticatedUser');
        navigate('/signin');
      }, 20 * 60 * 1000);

      return () => clearTimeout(timeout);
    };

    handleInactivity();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Centered container */}
      <div className="mt-1 min-h-[45vh] w-[30%] max-w-4xl flex-none rounded-[30px] border bg-white p-8 shadow-md shadow-gray-500">
        <div className="flex flex-col justify-center text-center">
          <h1 className="py-3 text-2xl font-bold text-customBlue">Sign In</h1>

          <form onSubmit={handleSubmit} className="m-3 mb-8 flex flex-col items-center gap-4">

            {error && <div className="text-sm text-red-500">{error}</div>}


            <div className='w-full max-w-md'>
              <label htmlFor="email" className='block text-left text-sm font-extrabold text-gray-700'>Email</label>
              <input
                id='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email...'
                className='mb-3 mt-2 block w-full rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:border-gray-500' />
            </div>


            <div className="w-full max-w-md">
              <label htmlFor="password" className="block text-left text-sm font-extrabold text-gray-700">Password</label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  className="mb-3 block w-full rounded-lg border border-gray-400 px-4 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              className="font-400 m-4 inline w-full items-center gap-3 rounded-lg bg-customBlue px-5 py-2.5 text-center text-sm text-white hover:bg-blue-600"
            >
              Log In
            </button>
          </form>


          <div className='flex items-center justify-center gap-3'>
            <div>Don't have an account?</div>
            <div>
              <Link to={'/register'} className="text-customBlue hover:underline">Create an Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
