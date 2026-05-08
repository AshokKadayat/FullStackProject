import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">📔</span>
          <span>Journal App</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/entries" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    Entries
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
            {isAuthenticated ? (
              <button
                id="logout-btn"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <Link to="/signup" className="btn btn-primary btn-sm">Join Free</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
