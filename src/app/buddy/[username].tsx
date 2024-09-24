import React, { useState } from 'react'; // Import useState
import { useRouter } from 'next/router'; // If you are using routing
import usersData from '../../../_data/users.json'; // Adjust the import as needed
import { User } from '../../types/User'; // Import the User type if needed

const UserBuddyPage = () => {
  const [buddy, setBuddy] = useState<User | null>(null); // State for buddy
  const router = useRouter();
  const { id } = router.query; // Assuming you're getting the ID from the router

  // Logic to find and set the buddy based on the ID
  const findBuddy = () => {
    // Your logic to find a buddy
    console.log("Finding buddy for user ID:", id);
    // Example logic to find a buddy
    // setBuddy(foundBuddy);
  };

  return (
    <div>
      <h1>Your Buddy</h1>
      {buddy ? (
        <div>
          <h2>{buddy.username}</h2>
          {/* Display buddy information */}
        </div>
      ) : (
        <p>No buddy found.</p>
      )}
      <button onClick={findBuddy}>Find Buddy</button>
    </div>
  );
};

export default UserBuddyPage;
