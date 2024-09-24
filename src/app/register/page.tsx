"use client"; // Mark this as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [degree, setDegree] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save user data to local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for existing username
    if (users.some((user: any) => user.username === username)) {
      alert('Username already exists');
      return;
    }

    const newUser = {
      username,
      password,
      questionnaire: {
        language,
        degree,
        hobbies: hobbies.split(',').map((hobby) => hobby.trim()), // Split hobbies into an array
        country,
      },
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully');
    router.push('/login'); // Redirect to login page after registration
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="hobbies">Hobbies (comma-separated)</Label>
            <Input
              id="hobbies"
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
