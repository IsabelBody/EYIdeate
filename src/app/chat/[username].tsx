import React from 'react';
import { useRouter } from 'next/router';

const ChatPage = () => {
  const router = useRouter();
  const { username } = router.query; // Get the username from the URL

  return (
    <div>
      <h1>Chat with {username}</h1>
      {/* Chat logic goes here */}
    </div>
  );
};

export default ChatPage;
