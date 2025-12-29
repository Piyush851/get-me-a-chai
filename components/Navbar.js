"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: session } = useSession();

    // Ref for the dropdown to detect clicks outside
    const dropdownRef = useRef(null);

    // Hook: Close dropdown if clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-900 border-b border-gray-800 w-full top-0 start-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                {/* --- Logo --- */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* Replace this img with your logo file if you have one */}
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Get Me a Chai
                    </span>
                </Link>

                {/* --- Right Side: Auth & Mobile Button --- */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">

                    {session ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Trigger Button */}
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                                type="button"
                            >
                                Welcome {session.user.name || session.user.email?.split('@')[0]}
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 z-50 bg-gray-800 divide-y divide-gray-700 rounded-lg shadow-lg w-44">
                                    <div className="px-4 py-3 text-sm text-white">
                                        <div className="font-medium truncate">{session.user.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-200">
                                        <li>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setShowDropdown(false)} // Close on click
                                                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/${session.user.name}`}
                                                onClick={() => setShowDropdown(false)}
                                                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            >
                                                Your Page
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Login Button */
                        <Link href='/login'>
                            <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                Login
                            </button>
                        </Link>
                    )}

                    {/* Hamburger Menu (Mobile) */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 ml-2"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* --- Center Links --- */}
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-white rounded hover:text-blue-500 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;