import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-white border-t border-slate-100 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} TechShop. All rights reserved.
                </div>
            </footer>
            <ToastContainer position="bottom-right" theme="light" />
        </div>
    );
};

export default Layout;
