'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db, realTimeDb } from '@/lib/firebase';
import { ref, push, onValue } from 'firebase/database';

const BuddyPage = () => {
  const router = useRouter();
  const [buddyData, setBuddyData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const pairedBuddy = localStorage.getItem('pairedBuddy');
    if (!pairedBuddy) {
      alert('No buddy found.');
      router.push('/events');
    } else {
      const buddy = JSON.parse(pairedBuddy);

      if (!buddy.username || !buddy.event) {
        console.error('Buddy data or event is missing:', buddy);
        alert('Buddy data or event is incomplete. Please re-pair.');
        router.push('/events');
      } else {
        setBuddyData(buddy);
      }
    }
  }, [router]);

  // Load chat messages in real-time
  useEffect(() => {
    if (!buddyData) return;

    const chatRef = ref(realTimeDb, 'chats');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredMessages = Object.values(data).filter((message: any) =>
          (message.senderId === buddyData?.username && message.receiverId === buddyData?.pairedUsername) ||
          (message.senderId === buddyData?.pairedUsername && message.receiverId === buddyData?.username)
        );
        setMessages(filteredMessages);
      }
    });
  }, [buddyData]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const messageData = {
      text: newMessage,
      sender: loggedInUser.username || 'Anonymous',
      senderId: loggedInUser.username,
      receiverId: buddyData.username,
      timestamp: Date.now(),
    };

    try {
      await push(ref(realTimeDb, 'chats'), messageData);
      setNewMessage(''); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Calculate common attributes
  const calculateCommonAttributes = () => {
    if (!buddyData) return '';

    const commonAttributes: string[] = [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (buddyData.questionnaire.language === loggedInUser.questionnaire.language) {
      commonAttributes.push(`You both speak <strong>${buddyData.questionnaire.language}</strong>`);
    }
    if (buddyData.questionnaire.degree === loggedInUser.questionnaire.degree) {
      commonAttributes.push(`you both study <strong>${buddyData.questionnaire.degree}</strong>`);
    }
    if (buddyData.questionnaire.country === loggedInUser.questionnaire.country) {
      commonAttributes.push(`you are both from <strong>${buddyData.questionnaire.country}</strong>`);
    }

    const commonHobbies = buddyData.questionnaire.hobbies.filter((hobby: string) =>
      loggedInUser.questionnaire.hobbies.includes(hobby)
    );
    if (commonHobbies.length > 0) {
      commonAttributes.push(`you both enjoy <strong>${commonHobbies.join(', ')}</strong>`);
    }

    return commonAttributes.join(', '); // Join the attributes to form a single string
  };

  // Fetch conversation prompts
  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: buddyData?.questionnaire.language,
          hobbies: buddyData?.questionnaire.hobbies,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversation prompts');
      }

      const data = await response.json();
      setPrompts(data.prompts);
    } catch (error) {
      console.error('Error fetching conversation prompts:', error);
    }
  };

  // Trigger prompt fetching on buddyData load
  useEffect(() => {
    if (buddyData) {
      fetchPrompts();
    }
  }, [buddyData]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle>Your Buddy</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Username:</strong> {buddyData?.username}</p>
          <p><strong>Language:</strong> {buddyData?.questionnaire.language}</p>
          <p><strong>Degree:</strong> {buddyData?.questionnaire.degree}</p>
          <p><strong>Hobbies:</strong> {buddyData?.questionnaire.hobbies.join(', ')}</p>
          <p><strong>Country of Origin:</strong> {buddyData?.questionnaire.country}</p>
        </CardContent>
      </Card>

      {/* Display Common Attributes */}
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle>We've paired you with {buddyData?.username} because..</CardTitle>
        </CardHeader>
        <CardContent>
          <p dangerouslySetInnerHTML={{ __html: calculateCommonAttributes() || 'No common attributes found.' }} />
        </CardContent>
      </Card>

      {/* Display Conversation Prompts */}
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle>Conversation Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          {prompts.length > 0 ? (
            <ul>
              {prompts.map((prompt, index) => (
                <li key={index}>{prompt}</li>
              ))}
            </ul>
          ) : (
            <p>Loading prompts...</p>
          )}
        </CardContent>
      </Card>

      {/* Event Details Card */}
      {buddyData?.event && (
        <Card className="w-full max-w-md mb-6">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={`/img/${buddyData.event.image}`}
              alt={buddyData.event.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{buddyData.event.title}</h2>
            <p>{buddyData.event.description}</p>
            <p className="text-gray-500">Duration: {buddyData.event.time} minutes</p>
          </CardContent>
        </Card>
      )}

      {/* Chat UI */}
      <div className="w-full max-w-md mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Get to know {buddyData?.username}!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-scroll border p-2 bg-gray-100 rounded">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className="mb-2">
                    <strong>{message.sender}:</strong> {message.text}
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button variant="default" onClick={sendMessage}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="default" onClick={() => router.push('/events')}>
        Back to Events
      </Button>
    </div>
  );
};

export default BuddyPage;
