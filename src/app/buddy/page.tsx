'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Buddy</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="h5" className="mb-2">Buddy Information:</Typography>
          <Typography variant="body1"><strong>Username:</strong> {buddyData.username}</Typography>
          <Typography variant="body1"><strong>Language:</strong> {buddyData.questionnaire.language}</Typography>
          <Typography variant="body1"><strong>Degree:</strong> {buddyData.questionnaire.degree}</Typography>
          <Typography variant="body1"><strong>Hobbies:</strong> {buddyData.questionnaire.hobbies.join(', ')}</Typography>
          <Typography variant="body1"><strong>Country:</strong> {buddyData.questionnaire.country}</Typography>
        </CardContent>
      </Card>

      {/* Button placed below the card */}
      <Button
        variant="default"
        onClick={() => router.push('/events')}
        className="mt-4"
      >
        Back to Events
      </Button>
    </div>
  );
};

export default BuddyPage;
