import { Link, useNavigate } from 'react-router';
import validator from 'validator';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //Generate a unique user id

  const generatedUserId = (name: string, email: string) => {
    const basedId = `${name.replace(/\s+/g, '')} _${email}`;
    return btoa(basedId); //base 64 encode to avoid invalid characters
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.password) {
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

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as Array<{ email: string }>;

    // Check if the user already exists
    const userExists = existingUsers.some((user) => user.email === formData.email);
    if (userExists) {
      setError('User with this email already exists.');
      return;
    }

    const userId = generatedUserId(formData.name, formData.email);
    const newUser = { ...formData, id: userId }

    // Register the user
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));


    navigate('/signIn');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-1 min-h-[60vh] w-[30%] max-w-4xl flex-none rounded-[30px] border bg-white p-8 shadow-md shadow-gray-500">
        <div className="flex flex-col justify-center text-center">
          <h1 className="py-3 text-2xl font-bold text-customBlue">Sign Up</h1>

          <form onSubmit={handleSubmit} className="m-3 flex flex-col items-center gap-4">
            {error && <div className="text-red-500">{error}</div>}

            {/* Name Input */}
            <div className="w-full max-w-md">
              <label htmlFor="name" className="block text-left text-sm font-extrabold text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="mb-3 mt-2 block w-full rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:border-gray-500"
              />
            </div>

            {/* Email Input */}
            <div className="w-full max-w-md">
              <label htmlFor="email" className="block text-left text-sm font-extrabold text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="mb-3 mt-2 block w-full rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:border-gray-500"
              />
            </div>

            {/* Password Input */}
            <div className="w-full max-w-md">
              <label htmlFor="password" className="block text-left text-sm font-extrabold text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="font-400 m-4 flex items-center gap-3 rounded-lg bg-customBlue px-5 py-2.5 text-sm text-white hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center justify-center gap-3">
            <div>Already have an account?</div>
            <Link to="/signIn" className="text-customBlue hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
