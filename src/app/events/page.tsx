"use client";

import { useState } from 'react';
import eventsData from '../../../_data/events.json';
import { useRouter } from 'next/navigation';
import usersData from '../../../_data/users.json';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

const weightOptions = [
  { label: "Unimportant", value: 1 },
  { label: "Slightly Important", value: 2 },
  { label: "Important", value: 3 },
  { label: "Very Important", value: 4 },
  { label: "Extremely Important", value: 5 },
];

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
  const handleWeightChange = (attribute: string, value: string) => {
    setWeightings({
      ...weightings,
      [attribute]: parseInt(value, 10),
    });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-20">
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>
      {/* Weighting settings */}
      <Card className="mb-4 p-4 max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Customize Your Buddy Matching Preferences</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Adjust the importance of each category to find the best match for you. The higher the importance, the more weight it will have when pairing you with a buddy.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Language Preference Importance: </label>
              <Select onValueChange={(value) => handleWeightChange('language', value)} value={weightings.language.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select importance level" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Degree Relevance Importance: </label>
              <Select onValueChange={(value) => handleWeightChange('degree', value)} value={weightings.degree.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select importance level" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Country of Origin Importance: </label>
              <Select onValueChange={(value) => handleWeightChange('country', value)} value={weightings.country.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select importance level" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Hobby Similarity Importance: </label>
              <Select onValueChange={(value) => handleWeightChange('hobby', value)} value={weightings.hobby.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select importance level" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.events.map((event) => (
          <Card key={event.id} className="shadow-md rounded-lg">
            <img
              src={`/img/${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Duration: {event.time} minutes</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={(e) => pairWithBuddy(e, event)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Pair me with a Buddy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
