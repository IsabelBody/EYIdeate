// src/app/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define a User type
export interface User {
  username: string;
  password: string;
  questionnaire: {
    language: string;
    degree: string;
    hobbies: string[];
    country: string;
  };
}

// Create a Context
const UserContext = createContext<{ loggedInUser: User | null; setLoggedInUser: (user: User | null) => void }>({
  loggedInUser: null,
  setLoggedInUser: () => {},
});

// Create a Provider Component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook for easy access to the context
export const useUserContext = () => useContext(UserContext);
