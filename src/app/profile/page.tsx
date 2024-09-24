"use client";

import React, { useEffect, useState } from 'react';
import { useUserContext } from '../UserContext';

const ProfilePage = () => {
  const { loggedInUser } = useUserContext();
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (loggedInUser) {
      console.log('Logged in user in ProfilePage:', loggedInUser);
      setUserDetails(loggedInUser);
    }
  }, [loggedInUser]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">@ {userDetails.username}</h1>
      <p><strong>Country of Origin:</strong> {userDetails?.questionnaire?.country || 'N/A'}</p>
      <p><strong>Language:</strong> {userDetails?.questionnaire?.language || 'N/A'}</p>
      <p><strong>Degree:</strong> {userDetails?.questionnaire?.degree || 'N/A'}</p>
      <p><strong>Hobbies:</strong> {userDetails?.questionnaire?.hobbies?.join(', ') || 'N/A'}</p>
    </div>
  );
};

export default ProfilePage;
