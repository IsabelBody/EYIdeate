"use client"; // Mark this component as a Client Component

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import Button component
import { useEffect, useState } from 'react'; // Import useEffect and useState
import { cn } from '@/lib/utils'; // Utility function from shadcn for conditionally applying classes
import { UserProvider, useUserContext } from './UserContext'; // Import UserProvider
import { FaUser } from 'react-icons/fa'; // Import the user icon

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider> {/* Wrap your app with UserProvider */}
          <nav className="flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-semibold text-black hover:text-gray-700 transition">
              UoA EventBuddy
            </Link>
            <div className="flex space-x-4">
              <UserConsumer /> {/* Separate component for navigation logic */}
            </div>
          </nav>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}

const UserConsumer = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return loggedInUser ? (
    <>
      <Link href="/profile">
        <Button className="rounded-full p-4 text-gray-700 hover:text-gray-500 transition bg-transparent text-3xl">
          <FaUser />
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
  );
};
