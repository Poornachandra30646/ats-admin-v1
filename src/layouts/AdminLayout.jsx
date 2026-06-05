import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {

  return (

    <div className="flex h-screen bg-slate-50 overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;