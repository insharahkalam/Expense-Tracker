import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../config/supabase';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await client.auth.signOut();
            setShowLogoutConfirm(false);
            navigate('/login');
            console.log("User logged out");
        } catch (error) {
            console.log("Logout error:", error.message);
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-stone-200">
                <div className="w-full mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span
                            className="text-xl text-stone-900"
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                        >
                            Expense_Tracker
                        </span>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-medium text-stone-900">John Doe</span>
                            <span className="text-xs text-stone-500">Premium</span>
                        </div>

                        {/* Avatar Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                
                                className="relative group"
                            >
                                <img
                                    src="https://i.pravatar.cc/100?img=12"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-stone-200 group-hover:border-stone-900 transition-all duration-200 object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-3 w-48 backdrop-blur-xl bg-white/90 border border-stone-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                                    {/* SETTINGS */}
                                    <button
                                        onClick={() => {
                                            navigate("/setting");
                                        }}
                                        className="block w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                                    >
                                        Settings
                                    </button>


                                    {/* LOGOUT */}
                                    <button
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setShowLogoutConfirm(true);
                                        }}
                                        className="w-full text-left block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl shadow-xl p-6 animate-in zoom-in-95 duration-200">
                        <h3
                            className="text-2xl text-stone-900 mb-2"
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                        >
                            Sign out?
                        </h3>
                        <p className="text-sm text-stone-600 mb-6">
                            You'll need to sign in again to access your expenses.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="px-4 py-2 bg-white border border-stone-200 hover:border-stone-900 text-stone-700 rounded-lg text-sm font-medium transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-stone-900 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all duration-200"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Navbar