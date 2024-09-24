// src/app/layout.tsx
"use client"; // Mark this component as a Client Component

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import Button component
import { useEffect, useState } from 'react'; // Import useEffect and useState

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-xl">UoA EventBuddy</h1>
          <div className="flex space-x-4">
            {loggedInUser ? (
              <>
                <Link href="/profile">
                  <Button className="rounded-full p-3 bg-blue-500 text-white hover:bg-blue-600 transition">
                    {/* Placeholder for profile icon */}
                    <span>👤</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 transition">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 transition">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
