import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import AuthModal from '../components/AuthModal';
import { Outlet } from 'react-router-dom';

export default function LandingPage() {
    
    const [authModal, setAuthModal] = useState();

  return (
    <div className="relative">
      

      <main className="p-6 mt-4">
        <section className="max-w-3xl mx-auto text-center">
          <Outlet/>
        </section>
      </main>

      {
        authModal && <AuthModal authModal = {authModal}/>
      }
    </div>
  );
}