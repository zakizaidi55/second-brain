import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import {Navbar} from '../components/Navbar';

export default function LandingPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="relative">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <main className="p-6 mt-4">
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome</h2>
          <p className="text-gray-600">
            This is a modern landing page with a sliding sidebar using Tailwind CSS and Framer Motion.
          </p>
        </section>
      </main>
    </div>
  );
}