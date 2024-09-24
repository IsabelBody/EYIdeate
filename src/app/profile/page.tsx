// src/app/profile/page.tsx
'use client'; // Mark this as a client component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login'); // Redirect to login if not logged in
      return;
    }

    const userDataFromStorage = JSON.parse(loggedInUser);
    const username = userDataFromStorage.username; // Get the username from localStorage

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        const user = data.users.find((user: any) => user.username === username); // Find the logged-in user

        if (user) {
          setUserData(user);
        } else {
          setError('User data not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>{error}</div>; // Handle error state
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold">@{userData.username}</h1>
      <p>Language: {userData.questionnaire.language}</p>
      <p>Degree: {userData.questionnaire.degree}</p>
      <p>Hobbies: {userData.questionnaire.hobbies.join(', ')}</p>
      <p>Country: {userData.questionnaire.country}</p>
    </div>
  );
};

export default ProfilePage;
