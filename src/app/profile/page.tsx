// src/app/profile/page.tsx
"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserData(JSON.parse(loggedInUser));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // or handle the loading state
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-sm w-full shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-6">{userData.username}'s Profile</h1>
        <h2 className="text-xl mb-4">Questionnaire Data:</h2>
        <p>Language: {userData.questionnaire.language}</p>
        <p>Degree: {userData.questionnaire.degree}</p>
        <p>Hobbies: {userData.questionnaire.hobbies.join(', ')}</p>
        <p>Country: {userData.questionnaire.country}</p>
        <div className="mt-6">
          <Button onClick={() => alert('Edit functionality not implemented yet!')}>Edit Profile</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
