"use client"; // Ensure the component is treated as a Client Component

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface Recipe {
  title: string; 
  image: string; 
  time: number; 
  description: string;
  vegan: boolean; 
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes');
  return result.json();
}

async function addRecipe(newRecipe: Recipe) {
  await fetch('http://localhost:4000/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    title: '', image: '', time: 0, description: '', vegan: false, id: ''
  });

  // Fetch recipes when the component mounts
  useEffect(() => {
    async function fetchRecipes() {
      const initialRecipes = await getRecipes();
      setRecipes(initialRecipes);
    }
    fetchRecipes();
  }, []); // Empty dependency array to run only on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecipe(newRecipe);  // Send recipe to the backend
    const updatedRecipes = await getRecipes(); // Get updated list
    setRecipes(updatedRecipes);  // Update UI with new recipe
    setNewRecipe({ title: '', image: '', time: 0, description: '', vegan: false, id: '' }); // Reset form
  };

  return (
    <main>
      {/* Form to add a new recipe */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Recipe Title" value={newRecipe.title} onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})} />
        <Input placeholder="Image Name" value={newRecipe.image} onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value})} />
        <Input placeholder="Time to Cook" type="number" value={newRecipe.time} onChange={(e) => setNewRecipe({...newRecipe, time: Number(e.target.value)})} />
        <Input placeholder="Description" value={newRecipe.description} onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})} />
        <label>
          <input type="checkbox" checked={newRecipe.vegan} onChange={(e) => setNewRecipe({...newRecipe, vegan: e.target.checked})} /> Vegan
        </label>
        <Button type="submit">Add Recipe</Button>
      </form>

      {/* Existing recipes */}
      <div className="grid grid-cols-3 gap-8 mt-8">
        {recipes.map(recipe => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
