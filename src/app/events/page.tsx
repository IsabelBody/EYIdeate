"use client";

import { useState } from 'react';
import eventsData from '../../../_data/events.json';
import { useRouter } from 'next/navigation';
import usersData from '../../../_data/users.json';

interface User {
  username: string;
  password: string;
  questionnaire: {
    language: string;
    degree: string;
    hobbies: string[];
    country: string;
  };
}

const EventsPage = () => {
  const router = useRouter();

  // State for user-defined weightings
  const [weightings, setWeightings] = useState({
    language: 3,
    degree: 2,
    country: 1,
    hobby: 2,
  });

  const pairWithBuddy = (event: React.MouseEvent<HTMLButtonElement>, selectedEvent: any) => {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
      alert("You need to be logged in to pair with a buddy!");
      return;
    }

    const potentialBuddies: User[] = usersData.users.filter(
      (user: User) => user.username !== loggedInUser.username
    );

    const calculateScore = (user: User): { score: number; commonAttributes: string[] } => {
      let score = 0;
      let commonAttributes: string[] = [];

      if (user.questionnaire.language === loggedInUser.questionnaire.language) {
        score += weightings.language;
        commonAttributes.push(`both speak ${user.questionnaire.language}`);
      }
      if (user.questionnaire.degree === loggedInUser.questionnaire.degree) {
        score += weightings.degree;
        commonAttributes.push(`both study ${user.questionnaire.degree}`);
      }
      if (user.questionnaire.country === loggedInUser.questionnaire.country) {
        score += weightings.country;
        commonAttributes.push(`both are from ${user.questionnaire.country}`);
      }

      const commonHobbies = user.questionnaire.hobbies.filter((hobby) =>
        loggedInUser.questionnaire.hobbies.includes(hobby)
      );
      if (commonHobbies.length > 0) {
        score += commonHobbies.length * weightings.hobby;
        commonAttributes.push(`both enjoy ${commonHobbies.join(', ')}`);
      }

      return { score, commonAttributes };
    };

    const bestBuddy = potentialBuddies.reduce((prev, current) => {
      const prevResult = calculateScore(prev);
      const currentResult = calculateScore(current);
      return currentResult.score > prevResult.score ? current : prev;
    }, potentialBuddies[0]);

    if (bestBuddy) {
      const pairingResult = calculateScore(bestBuddy);
      const pairedBuddy = {
        username: bestBuddy.username,
        pairedUsername: loggedInUser.username,
        questionnaire: bestBuddy.questionnaire,
        commonAttributes: pairingResult.commonAttributes,
        event: selectedEvent,
      };
      localStorage.setItem('pairedBuddy', JSON.stringify(pairedBuddy));
      router.push('/buddy');
    } else {
      alert('No suitable buddy found.');
    }
  };

  // Function to handle weighting changes
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
    setWeightings({
      ...weightings,
      [attribute]: parseInt(e.target.value, 10),
    });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-20">
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>
      {/* Weighting settings */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Set Weightings for Pairing</h2>
        <div>
          <label>Language: </label>
          <input
            type="number"
            value={weightings.language}
            onChange={(e) => handleWeightChange(e, 'language')}
            className="border rounded px-2 mx-1"
          />
        </div>
        <div>
          <label>Degree: </label>
          <input
            type="number"
            value={weightings.degree}
            onChange={(e) => handleWeightChange(e, 'degree')}
            className="border rounded px-2 mx-1"
          />
        </div>
        <div>
          <label>Country: </label>
          <input
            type="number"
            value={weightings.country}
            onChange={(e) => handleWeightChange(e, 'country')}
            className="border rounded px-2 mx-1"
          />
        </div>
        <div>
          <label>Hobby: </label>
          <input
            type="number"
            value={weightings.hobby}
            onChange={(e) => handleWeightChange(e, 'hobby')}
            className="border rounded px-2 mx-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`/img/${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500">Duration: {event.time} minutes</p>
            <button
              onClick={(e) => pairWithBuddy(e, event)} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pair me with a Buddy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
