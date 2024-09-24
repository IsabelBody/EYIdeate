"use client";

import eventsData from '../../../_data/events.json';
import { useRouter } from 'next/navigation';
import usersData from '../../../_data/users.json';

// Define the structure for the User type
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

  // Function to pair the user
  const pairWithBuddy = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!loggedInUser) {
      alert("You need to be logged in to pair with a buddy!");
      return;
    }

    // Get users from user data excluding the logged-in user
    const potentialBuddies: User[] = usersData.users.filter(
      (user: User) => user.username !== loggedInUser.username
    );

    // Function to calculate similarity score between two users
    const calculateScore = (user: User): number => {
      let score = 0;

      // Give more weight to language and hobbies matches
      if (user.questionnaire.language === loggedInUser.questionnaire.language) score += 3;
      if (user.questionnaire.degree === loggedInUser.questionnaire.degree) score += 2;
      if (user.questionnaire.country === loggedInUser.questionnaire.country) score += 1;
      
      // Count matching hobbies
      const commonHobbies = user.questionnaire.hobbies.filter((hobby) =>
        loggedInUser.questionnaire.hobbies.includes(hobby)
      );
      score += commonHobbies.length * 2; // Give more weight to hobbies

      return score;
    };

    // Find the buddy with the highest score
    const bestBuddy = potentialBuddies.reduce((prev, current) => {
      const prevScore = calculateScore(prev);
      const currentScore = calculateScore(current);
      return currentScore > prevScore ? current : prev;
    }, potentialBuddies[0]);

    if (bestBuddy) {
      // Store paired buddy in local storage and navigate to buddy's page
      const pairedBuddy = {
        username: bestBuddy.username,
        pairedUsername: loggedInUser.username, // Store the logged-in user as paired
        questionnaire: bestBuddy.questionnaire,
      };
      localStorage.setItem('pairedBuddy', JSON.stringify(pairedBuddy));
      router.push('/buddy');
    } else {
      alert('No suitable buddy found.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-20">
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>
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
              onClick={pairWithBuddy}
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
