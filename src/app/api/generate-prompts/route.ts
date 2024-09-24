// src/app/api/generate-prompts/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Define the expected structure of the incoming data
interface PromptData {
  language: string;
  hobbies: string[];
}

export async function POST(req: NextRequest) {
    try {
      const data: PromptData = await req.json();
      console.log('Received data:', data); // Log incoming data
  
      const prompts = generatePrompts(data); // Use the correctly typed data
  
      return NextResponse.json({ prompts });
    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ error: 'Failed to generate prompts' }, { status: 500 });
    }
  }
  

// Example function to generate prompts based on the incoming data
function generatePrompts(data: PromptData) {
    // Check if 'data' has the expected structure
    if (!data || !data.language || !data.hobbies || data.hobbies.length === 0) {
      return ["Please provide valid input!"];
    }
  
    // Generate prompts based on the data
    return [
      `What are your favorite hobbies related to ${data.language}?`,
      `How do you prefer to spend your weekends?`,
      `What languages do you speak?`
    ];
  }
  
  
