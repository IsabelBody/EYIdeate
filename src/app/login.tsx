// pages/login.tsx

// import { Button, Input, Label, Textarea } from "@/components/ui"; // Adjust import based on your shadcn setup


import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';



export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    language: "",
    degree: "",
    hobbies: "",
    country: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate inserting data into JSON (or a database)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("User registered successfully!");
      } else {
        alert("Failed to register.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="language">Language</Label>
        <Input
          id="language"
          name="language"
          type="text"
          value={formData.language}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="degree">Degree</Label>
        <Input
          id="degree"
          name="degree"
          type="text"
          value={formData.degree}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="hobbies">Hobbies</Label>
        <Textarea
          id="hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="country">Country of Origin</Label>
        <Input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
