import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Dialog, DialogContent } from '../ui/dialog';

export default function AuthModal({ isOpen, onClose, defaultView = 'login' }) {
  const [view, setView] = useState(defaultView);

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data);
    onClose();
    // Aquí puedes redirigir al dashboard o actualizar el estado global
  };

  const handleRegisterSuccess = (data) => {
    console.log('Register successful:', data);
    onClose();
    // Aquí puedes redirigir al dashboard o actualizar el estado global
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border p-0 overflow-hidden">
        <div className="p-6">
          {view === 'login' ? (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setView('register')}
            />
          ) : (
            <Register
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setView('login')}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
