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
  const [commonAttributes, setCommonAttributes] = useState<string[]>([]);

  // Fetch buddy data from localStorage
  useEffect(() => {
    const pairedBuddy = localStorage.getItem('pairedBuddy');
    if (!pairedBuddy) {
      alert('No buddy found.');
      router.push('/events');
      return;
    }

    const buddy = JSON.parse(pairedBuddy);
    console.log('Parsed Buddy Data:', buddy);

    if (!buddy.username) {
      console.error('Buddy data is missing the username:', buddy);
      alert('Buddy data is incomplete. Please re-pair.');
      router.push('/events');
      return;
    }

    setBuddyData(buddy);
    setCommonAttributes(buddy.commonAttributes || []);
  }, [router]);

  // Load chat messages in real-time
  useEffect(() => {
    if (!buddyData) return;

    const chatRef = ref(realTimeDb, 'chats');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredMessages = Object.values(data).filter((message: any) =>
          (message.senderId === buddyData.username && message.receiverId === buddyData.pairedUsername) ||
          (message.senderId === buddyData.pairedUsername && message.receiverId === buddyData.username)
        );
        setMessages(filteredMessages);
      }
    });
  }, [buddyData]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const messageData = {
      text: newMessage,
      sender: loggedInUser?.username || 'Anonymous',
      senderId: loggedInUser.username,
      receiverId: buddyData?.username,
      timestamp: Date.now(),
    };

    try {
      await push(ref(realTimeDb, 'chats'), messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle>Your Buddy</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Username:</strong> {buddyData?.username}</p>
          <p><strong>Language:</strong> {buddyData?.questionnaire?.language}</p>
          <p><strong>Degree:</strong> {buddyData?.questionnaire?.degree}</p>
        </CardContent>
      </Card>

      {/* Event Details Card */}
      {buddyData?.event ? (
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
      ) : (
        <p>No event information available for this buddy.</p>
      )}

      {/* Common Attributes Section */}
      {commonAttributes.length > 0 && (
        <Card className="w-full max-w-md mb-6">
          <CardHeader>
            <CardTitle>What you have in common with {buddyData?.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              {commonAttributes.map((attribute, index) => (
                <li key={index}>{attribute}</li>
              ))}
            </ul>
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
