
interface NavbarProps {
    toggleSidebar: () => void;
}

//@ts-ignore
export function Navbar({toggleSidebar}) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">☰</button>
      <div className="flex gap-3">
        <button className="text-white text-xl border p-3 rounded-md">Login</button>
        <button className="text-white text-xl border p-3 rounded-md">Signup</button>
      </div>
    </header>
  );
}


