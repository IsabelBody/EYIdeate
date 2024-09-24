'use client'; // Mark this as a client component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login'); // Redirect to login if not logged in
    } else {
      setUserData(JSON.parse(loggedInUser));
    }
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold">{userData.username}'s Profile</h1>
      <h2 className="text-lg mt-4">Questionnaire Data:</h2>
      <p>Language: {userData.questionnaire.language}</p>
      <p>Degree: {userData.questionnaire.degree}</p>
      <p>Hobbies: {userData.questionnaire.hobbies.join(', ')}</p>
      <p>Country: {userData.questionnaire.country}</p>
    </div>
  );
};

export default ProfilePage;
