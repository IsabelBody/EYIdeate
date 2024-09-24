'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BuddyPage = () => {
  const router = useRouter();
  const [buddyData, setBuddyData] = useState<any>(null);

  useEffect(() => {
    const pairedBuddy = localStorage.getItem('pairedBuddy');
    if (!pairedBuddy) {
      alert('No buddy found.');
      router.push('/events');
    } else {
      setBuddyData(JSON.parse(pairedBuddy));
    }
  }, [router]);

  if (!buddyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold">Your Buddy</h1>
      <h2 className="text-lg mt-4">Buddy Information:</h2>
      <p>Username: {buddyData.username}</p>
      <p>Language: {buddyData.questionnaire.language}</p>
      <p>Degree: {buddyData.questionnaire.degree}</p>
      <p>Hobbies: {buddyData.questionnaire.hobbies.join(', ')}</p>
      <p>Country: {buddyData.questionnaire.country}</p>
      <button
        onClick={() => router.push('/events')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Events
      </button>
    </div>
  );
};

export default BuddyPage;
