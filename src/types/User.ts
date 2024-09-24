// src/types/User.ts
export interface User {
    username: string;
    password: string; // Consider removing this if not needed
    questionnaire: {
      language: string;
      degree: string;
      hobbies: string[];
      country: string;
    };
  }
  