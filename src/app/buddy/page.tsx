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

  useEffect(() => {
    const pairedBuddy = localStorage.getItem('pairedBuddy');
    if (!pairedBuddy) {
      alert('No buddy found.');
      router.push('/events');
    } else {
      setBuddyData(JSON.parse(pairedBuddy));
    }
  }, [router]);

  // Load chat messages in real-time
  useEffect(() => {
    const chatRef = ref(realTimeDb, 'chats');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      text: newMessage,
      sender: buddyData?.username || 'Anonymous',
      timestamp: Date.now(),
    };

    // Push new message to the database
    await push(ref(realTimeDb, 'chats'), messageData);
    setNewMessage(''); // Clear input after sending
  };

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
        </CardContent>
      </Card>

      {/* Chat UI */}
      <div className="w-full max-w-md mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Chat with {buddyData?.username}</CardTitle>
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
