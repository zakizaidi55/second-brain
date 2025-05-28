import { Outlet } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative">
      <main className="p-6 mt-4">
        <section className="max-w-3xl mx-auto text-center">
          <Outlet/>
        </section>
      </main>
    </div>
  );
}