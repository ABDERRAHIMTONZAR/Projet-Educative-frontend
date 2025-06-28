import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen  } from 'lucide-react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password
      });
  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      const role = localStorage.getItem('role');

     switch (role) {
        case 'enseignant':
          navigate('/ensignantsdashboard');
          break;
        case 'direction':
          navigate('/dashboard');
          break;
        default:
          navigate('/NotFound');
     }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erreur de connexion');
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
          <BookOpen  className="w-3 h-3 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Evalya Smart</h2>
      </div>
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">LogIn</h1>
      
      {error && (
        <div className="text-red-500 text-sm text-center mt-2">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                placeholder="Create a password"
              />
              
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>                          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                       bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                       transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'LogIn'}
          </button>
        </div>
      </form>
      <div className='flex justify-center'>
      <Link to="/ForgetPassword" className="text-blue-600 hover:text-blue-700">
          Mot de passe oublie?
        </Link>
        </div>
      
      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        By logging up, you agree to our{' '}
        <Link to="/TermsOfService" className="text-green-600 hover:text-green-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <a href="/PrivacyPolicy" className="text-green-600 hover:text-green-700">
          Privacy Policy
        </a>
      </p>
      
    </div>
  );
};

export default LoginForm;