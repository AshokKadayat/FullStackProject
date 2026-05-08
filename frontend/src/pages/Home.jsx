import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api/axios';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    // Ping health check on load
    api.get('/public/Health-check')
      .then((res) => {
        setHealthStatus(res.data || 'Online');
      })
      .catch(() => {
        setHealthStatus('Offline / Error');
      });
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="hero-badge badge badge-blue mb-3">v1.0.0 Now Live</div>
        <h1 className="hero-title">Your thoughts, <br/>Refined and Secure.</h1>
        <p className="hero-subtitle">
          Experience the ultimate minimal journaling app. Track your mood, 
          secure your memories, and stay productive with our JWT-protected cloud storage.
        </p>

        <div className="flex justify-center flex-wrap gap-3 mt-4">
          {isAuthenticated ? (
            <Link to="/entries" className="btn btn-primary btn-lg">Go to Workspace</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">Explore Features</Link>
            </>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <div className="badge badge-muted">
            API Status: <span className={healthStatus.toLowerCase().includes('ok') || healthStatus.toLowerCase().includes('online') ? 'text-green-400' : 'text-red-400'}>{healthStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
