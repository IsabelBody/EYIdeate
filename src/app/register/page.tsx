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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            questionnaire: {
                language,
                degree,
                hobbies: hobbies.split(',').map((hobby) => hobby.trim()),
                country,
            },
        }),
    });

    const data = await response.json();

    if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    } else {
        setErrorMessage(data.message || 'An error occurred');
        setSuccessMessage('');
    }
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
            <Label htmlFor="language">What language do you speak?</Label>
            <Input
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              placeholder="e.g., Mandarin"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="degree">What degree are you pursuing?</Label>
            <Input
              id="degree"
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              placeholder="e.g., Computer Science"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="hobbies">What are your hobbies? (separate by commas)</Label>
            <Input
              id="hobbies"
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              required
              placeholder="e.g., reading, hiking, gaming"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="country">Which country are you from?</Label>
            <Input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="e.g., New Zealand"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
